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
        public async Task<IActionResult> GetAlumnosExamen(int id)
        {
            await Db.Connection.OpenAsync();
            AlumnoExamen alumno = new AlumnoExamen(Db);
            var result = await alumno.GetAlumnosExamen(id);
            return new OkObjectResult(result);
        }

    }
}