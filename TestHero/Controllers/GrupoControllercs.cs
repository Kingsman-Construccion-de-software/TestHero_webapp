using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> GetGruposProfesor(int id)
        {
            await Db.Connection.OpenAsync();
            Grupo grupo = new Grupo(Db);
            var result = await grupo.GetGruposProfesor(id);
            return new OkObjectResult(result);
        }

        // GET: api/grupo/id
        [Route("api/grupo/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> Get(int id)

        {
            await Db.Connection.OpenAsync();
            Grupo grupo = new Grupo(Db);
            var result = await grupo.GetGrupo(id);
            return new OkObjectResult(result);
        }


    }
}