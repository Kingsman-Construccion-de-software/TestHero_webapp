﻿using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]

    public class GrupoController : ControllerBase
    {
        public AppDb Db { get; }

        public GrupoController(AppDb db)
        {
            Db = db;
        }

        // GET api/grupo/profesor/id
        [Route("api/grupo/profesor/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getgruposprofesor por idgrupo
        /// </summary>
        public async Task<IActionResult> GetGruposProfesor(int id)
        {
            await Db.Connection.OpenAsync();
            Grupo grupo = new Grupo(Db);
            var result = await grupo.GetGruposProfesor(id);
            return new OkObjectResult(result);
        }
        // POST api/grupo
        [Route("api/grupo")]
        [HttpPost]
        /// <summary>
        /// Rutamiento de crea respuesta
        /// </summary>
        public async Task<IActionResult> Post([FromBody] Grupo body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.InsertGrupo();
            return new OkObjectResult(body);
        }
        // GET: api/grupo/id
        [Route("api/grupo/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getgrupo dado un id
        /// </summary>
        public async Task<IActionResult> Get(int id)

        {
            await Db.Connection.OpenAsync();
            Grupo grupo = new Grupo(Db);
            var result = await grupo.GetGrupo(id);
            return new OkObjectResult(result);
        }


    }
}