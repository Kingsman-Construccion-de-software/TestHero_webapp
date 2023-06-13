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

        [Route("api/alumnosRegistro")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de get profesor por idProfesor
        /// </summary>
        public async Task<IActionResult> GetAlumnosRegistro()

        {
            await Db.Connection.OpenAsync();
            Alumno alumno = new Alumno(Db);
            var result = await alumno.GetAlumnos();
            return new OkObjectResult(result);
        }

        [Route("api/alumnosRegistro")]
        [HttpPost]
        /// <summary>
        /// Rutamiento de registor alumno
        /// </summary>
        public async Task<IActionResult> PostAlumnosRegistro([FromBody] Alumno body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.InsertAlumno();
            return new OkObjectResult(body);
        }


        [Route("api/alumno/{id:int}/tickets")]
        [HttpPut]
        /// <summary>
        /// Rutamiento de actualizar tickets
        /// </summary>
        public async Task<IActionResult> PutTickets(int id, [FromBody] Ticket body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.UpdateTickets(id);
            return new OkObjectResult(body);
        }

        [Route("api/alumno/{id:int}/tickets")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de obtener tickets
        /// </summary>
        public async Task<IActionResult> GetTickets(int id)
        {
            await Db.Connection.OpenAsync();
            Ticket ticket = new Ticket(Db);
            var result = await ticket.GetTickets(id);
            return new OkObjectResult(result);
        }


        [Route("api/alumno/{id:int}/poderes")]
        [HttpGet]
        /// <summary>
        /// Rutamiento para obtener los poderes de un alumno
        /// </summary>
        public async Task<IActionResult> GetPoderes(int id)
        {
            await Db.Connection.OpenAsync();
            AlumnoPoder alumnopoder = new AlumnoPoder(Db);
            var result = await alumnopoder.GetPoderesAlumno(id);
            return new OkObjectResult(result);
        }


        [Route("api/alumno/{id:int}/poderes")]
        [HttpPut]
        /// <summary>
        /// Rutamiento para actualizar los poderes de un alumno
        /// </summary>
        public async Task<IActionResult> PutPoderes(int id, [FromBody] AlumnoPoder body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.UpdatePoderes(id);
            body.IdAlumno = id;
            return new OkObjectResult(body);
        }

    }
}