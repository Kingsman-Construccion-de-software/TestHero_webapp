using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]

    public class PreguntaController : ControllerBase
    {
        public AppDb Db { get; }

        public PreguntaController(AppDb db)
        {
            Db = db;
        }

        // GET api/pregunta/examen/id
        [Route("api/pregunta/examen/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetExamenPreguntas(int id)
        {
            await Db.Connection.OpenAsync();
            Pregunta pregunta = new Pregunta(Db);
            var result = await pregunta.GetExamenPreguntas(id);
            return new OkObjectResult(result);
        }

        // GET: api/<Pregunta>/id
        [Route("api/pregunta/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> Get(int id)

        {
            await Db.Connection.OpenAsync();
            Pregunta pregunta = new Pregunta(Db);
            var result = await pregunta.GetPregunta(id);
            return new OkObjectResult(result);
        }


        // POST api/<Pregunta>
        [Route("api/pregunta")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Pregunta body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.InsertPregunta();
            return new OkObjectResult(body);
        }

        // PUT api/<Pregunta>/id
        [Route("api/pregunta/{id:int}")]
        [HttpPut]
        public async Task<IActionResult> Put(int id, [FromBody] Pregunta body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            var result = await body.GetPregunta(id);
            if (result.Count == 0)
                return new NotFoundResult();
            await body.UpdatePregunta(id);
            return new OkObjectResult(body);
        }

        // DELETE api/<Pregunta>/id
        [Route("api/pregunta/{id:int}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await Db.Connection.OpenAsync();
            Pregunta pregunta = new Pregunta(Db);
            var result = await pregunta.GetPregunta(id);
            if (result.Count == 0)
                return new NotFoundResult();
            await pregunta.DeletePregunta(id);
            return new OkResult();
        }

    }
}
