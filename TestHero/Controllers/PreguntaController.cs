using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class PreguntaController : ControllerBase
    {
        public AppDb Db { get; }

        public PreguntaController(AppDb db)
        {
            Db = db;
        }

        // GET: api/<Pregunta>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)

        {
            await Db.Connection.OpenAsync();
            Pregunta pregunta = new Pregunta(Db);
            var result = await pregunta.GetExamenPreguntas(id);
            return new OkObjectResult(result);
        }

        /*

        // GET api/<Pregunta>/id
        [HttpGet("{id}")]

        public async Task<IActionResult> Get(int id)
        {
            await Db.Connection.OpenAsync();
            Pregunta pregunta = new Pregunta(Db);
            var result = await pregunta.GetExamenPreguntas(id);
            return new OkObjectResult(result);
        }

        */

        // POST api/<Pregunta>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Pregunta body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.InsertPregunta();
            return new OkObjectResult(body);
        }

        // PUT api/<Pregunta>/id
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Pregunta body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            //var result = await body.UpdatePregunta(id);
            //if (result is null)
            //    return new NotFoundResult();
            //result.TextoPregunta = body.TextoPregunta;
            await body.UpdatePregunta(id);
            return new OkObjectResult(body);
        }

        // DELETE api/<Pregunta>/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await Db.Connection.OpenAsync();
            //var result = await body.UpdatePregunta(id);
            //if (result is null)
            //    return new NotFoundResult();
            //result.TextoPregunta = body.TextoPregunta;
            Pregunta pregunta = new Pregunta(Db);
            await pregunta.DeletePregunta(id);
            return new OkResult();
        }

    }
}
