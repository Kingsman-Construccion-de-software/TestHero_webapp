using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]

    public class ExamenController : ControllerBase
    {
        public AppDb Db { get; }

        public ExamenController(AppDb db)
        {
            Db = db;
        }

        // GET: api/examen/grupo/id
        [Route("api/examen/grupo/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetGrupoExamenes(int id)
        {
            await Db.Connection.OpenAsync();
            Examen examen = new Examen(Db);
            var result = await examen.GetGrupoExamenes(id);
            return new OkObjectResult(result);
        }

        // GET: api/<Examen>/id
        [Route("api/examen/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            await Db.Connection.OpenAsync();
            Examen examen = new Examen(Db);
            var result = await examen.GetExamen(id);
            return new OkObjectResult(result);
        }


        // POST api/<Examen>
        [Route("api/examen")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Examen body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.InsertExamen();
            return new OkObjectResult(body);
        }


    }
}
