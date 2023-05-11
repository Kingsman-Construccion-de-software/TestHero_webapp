using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]

    public class RespuestaController : ControllerBase
    {
        public AppDb Db { get; }

        public RespuestaController(AppDb db)
        {
            Db = db;
        }

        // GET api/respuesta/pregunta/id
        [Route("api/respuesta/pregunta/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de gerpreguntarespuesta por idrespuesta
        /// </summary>
        public async Task<IActionResult> GetPreguntaRespuestas(int id)
        {
            await Db.Connection.OpenAsync();
            Respuesta respuesta = new Respuesta(Db);
            var result = await respuesta.GetPreguntaRespuestas(id);
            return new OkObjectResult(result);
        }

        // GET: api/respuesta/id
        [Route("api/respuesta/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de get por idrespuesta
        /// </summary>
        public async Task<IActionResult> Get(int id)

        {
            await Db.Connection.OpenAsync();
            Respuesta respuesta = new Respuesta(Db);
            var result = await respuesta.GetRespuesta(id);
            return new OkObjectResult(result);
        }


        // POST api/respuesta
        [Route("api/respuesta")]
        [HttpPost]
        /// <summary>
        /// Rutamiento de crea respuesta
        /// </summary>
        public async Task<IActionResult> Post([FromBody] Respuesta body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.InsertRespuesta();
            return new OkObjectResult(body);
        }

        // PUT api/respuesta/id
        [Route("api/respuesta/{id:int}")]
        [HttpPut]
        /// <summary>
        /// Rutamiento actualiza respuesta dado un idespuesta
        /// </summary>
        public async Task<IActionResult> Put(int id, [FromBody] Respuesta body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            var result = await body.GetRespuesta(id);
            if (result.Count == 0)
                return new NotFoundResult();
            await body.UpdateRespuesta(id);
            return new OkObjectResult(body);
        }

     

    }
}
