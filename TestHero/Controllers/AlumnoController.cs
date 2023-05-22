using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]

    public class AlumnoController : ControllerBase
    {
        public AppDb Db { get; }

        public AlumnoController(AppDb db)
        {
            Db = db;
        }

        // GET api/alumno/examen/id
        [Route("api/alumno/examen/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getalumnoexamen
        /// </summary>
        public async Task<IActionResult> GetAlumnosExamen(int id)
        {
            await Db.Connection.OpenAsync();
            AlumnoExamen alumno = new AlumnoExamen(Db);
            var result = await alumno.GetAlumnosExamen(id);
            return new OkObjectResult(result);
        }


        // GET api/alumno/examen/id
        [Route("api/alumno/examen/{idA:int}/{idE:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getalumnoexamen
        /// </summary>
        public async Task<IActionResult> GetAlumnosExamen(int idA, int idE)
        {
            await Db.Connection.OpenAsync();
            AlumnoExamen alumno = new AlumnoExamen(Db);
            var result = await alumno.GetAlumnoExamen(idA, idE);
            if(result.Count > 0)
            {
                return new OkObjectResult(result[0]);
            } else
            {
                return new NotFoundObjectResult(null);
            }            
        }

        // POST api/alumno/examen
        [Route("api/alumno/examen")]
        [HttpPost]
        /// <summary>
        /// Rutamiento de getalumnoexamen
        /// </summary>
        public async Task<IActionResult> PostAlumnosExamen([FromBody] AlumnoExamen body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.InsertAlumnoExamen();
            return new OkObjectResult(body);
        }

        // GET api/alumno/pregunta/idA/idE
        [Route("api/alumno/pregunta/{idA:int}/{idP:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getalumnopregunta
        /// </summary>
        public async Task<IActionResult> GetAlumnoExamen(int idA, int idP)
        {
            await Db.Connection.OpenAsync();
            AlumnoPregunta alumno = new AlumnoPregunta(Db);
            var result = await alumno.GetAlumnoPregunta(idA, idP);
            return new OkObjectResult(result);
        }


        // POST api/alumno/pregunta
        [Route("api/alumno/pregunta")]
        [HttpPost]
        /// <summary>
        /// Rutamiento de postalumnopregunta
        /// </summary>
        public async Task<IActionResult> PostAlumnoPregunta([FromBody] AlumnoPregunta body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.InsertAlumnoPregunta();
            return new OkObjectResult(body);
        }

    }
}