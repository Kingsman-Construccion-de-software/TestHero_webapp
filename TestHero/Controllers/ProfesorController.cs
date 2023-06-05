using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]
    public class ProfesorController : ControllerBase
    {

        public AppDb Db { get; }

        public ProfesorController(AppDb db)
        {
            Db = db;
        }

        [Route("api/profesor")]
        [HttpPost]
        /// <summary>
        /// Rutamiento de registor profesor
        /// </summary>
        public async Task<IActionResult> Post([FromBody] Profesor body)
        {
            await Db.Connection.OpenAsync();
            body.Db = Db;
            await body.InsertProfesor();
            return new OkObjectResult(body);
        }

        // GET: api/profesor/id
        [Route("api/profesor/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de get profesor por idProfesor
        /// </summary>
        public async Task<IActionResult> Get(int id)

        {
            await Db.Connection.OpenAsync();
            Profesor profesor = new Profesor(Db);
            var result = await profesor.GetProfesor(id);
            result[0].IdProfesor = id;
            return new OkObjectResult(result);
        }


        [Route("api/profesor")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de get profesor por idProfesor
        /// </summary>
        public async Task<IActionResult> GetProfesores()

        {
            await Db.Connection.OpenAsync();
            Profesor profesor = new Profesor(Db);
            var result = await profesor.GetProfesores();
            return new OkObjectResult(result);
        }
    }
}
