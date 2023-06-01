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

        // GET api/alumno/examen/idE/idA
        [Route("api/alumno/examen/{idE:int}/{idA:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getalumnoexamen
        /// </summary>
        public async Task<IActionResult> GetAlumnosCalificacion(int idE, int idA)
        {
            await Db.Connection.OpenAsync();
            AlumnoExamen alumno = new AlumnoExamen(Db);
            var result = await alumno.GetAlumnosCalificacion(idE, idA);
            if (result.Count == 0)
            {
                return new NotFoundObjectResult(null);
            }
            return new OkObjectResult(result[0]);
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

        // GET api/alumno/pregunta/idA/idE
        [Route("api/alumnopregunta/{idA:int}/{idE:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getalumnopregunta
        /// </summary>
        public async Task<IActionResult> GetAlumnoPreguntas(int idA, int idE)
        {
            await Db.Connection.OpenAsync();
            AlumnoPregunta alumno = new AlumnoPregunta(Db);
            var result = await alumno.GetAlumnoPreguntas(idA, idE);
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

        [Route("api/grupo/alumno/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de GetGruposAlumno por idgrupo
        /// </summary>
        public async Task<IActionResult> GetGrupoAlumno(int id)

        {
            await Db.Connection.OpenAsync();
            Alumno alumno = new Alumno(Db);
            var result = await alumno.GetGrupoAlumno(id);
            return new OkObjectResult(result);
        }

        [Route("api/alumno/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de get profesor por idAlumno
        /// </summary>
        public async Task<IActionResult> GetAlumno(int id)

        {
            await Db.Connection.OpenAsync();
            Alumno alumno = new Alumno(Db);
            var result = await alumno.GetAlumno(id);
            result[0].IdAlumno = id;
            return new OkObjectResult(result);
        }

        [Route("api/alumno")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de get profesor por idProfesor
        /// </summary>
        public async Task<IActionResult> GetAlumnos()

        {
            await Db.Connection.OpenAsync();
            Alumno alumno = new Alumno(Db);
            var result = await alumno.GetAlumnos();
            return new OkObjectResult(result);
        }
    }
}