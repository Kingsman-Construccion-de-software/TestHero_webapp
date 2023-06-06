using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

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

        // GET: api/examen/profesor/id
        [Route("api/examen/profesor/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getprofesorexamenes dada una idexamen
        /// </summary>
        public async Task<IActionResult> GetProfesorExamenes(int id)
        {
            await Db.Connection.OpenAsync();
            ExamenGrupo examen = new ExamenGrupo(Db);
            var result = await examen.GetProfesorExamenesActivos(id);
            return new OkObjectResult(result);
        }

        // GET: api/examen/grupo/id
        [Route("api/examen/grupo/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getgrupoexamenes es dado por idexamen
        /// </summary>
        public async Task<IActionResult> GetGrupoExamenes(int id)
        {
            await Db.Connection.OpenAsync();
            Examen examen = new Examen(Db);
            var result = await examen.GetGrupoExamenes(id);
            return new OkObjectResult(result);
        }

        // GET: api/<Examen>/id
        [Route("api/examen/codigo/{codigo}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de get examen por su codigo
        /// </summary>
        public async Task<IActionResult> Get(string codigo)
        {
            await Db.Connection.OpenAsync();
            Examen examen = new Examen(Db);
            var result = await examen.GetExamenCodigo(codigo);
            if(result.Count > 0)
            {
                return new OkObjectResult(result[0]);
            } else
            {
                return new NotFoundObjectResult(string.Empty);
            }
        }

        // GET: api/<Examen>/id
        [Route("api/examen/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de get examen por su id
        /// </summary>
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
        /// <summary>
        /// Rutamiento de creaexamen
        /// </summary>
        public async Task<IActionResult> Post([FromBody] Examen body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.InsertExamen();
            return new OkObjectResult(body);
        }
        [Route("api/alumno/examenes/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getalumnoexamen
        /// </summary>
        public async Task<IActionResult> GetAlumnosExamenes(int id)
        {
            await Db.Connection.OpenAsync();
            Examen examen = new Examen(Db);
            var result = await examen.GetAlumnosExamenes(id);
            return new OkObjectResult(result);
        }

        [Route("api/examen/{id:int}")]
        [HttpPut]
        public async Task<IActionResult> Put(int id, [FromBody] Examen body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            var result = await body.GetExamen(id);
            if (result.Count == 0)
                return new NotFoundResult();
            await body.UpdateExamen(id);
            return new OkObjectResult(body);
        }

    }
}
