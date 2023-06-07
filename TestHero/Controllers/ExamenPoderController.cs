using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]
    public class ExamenPoderController : ControllerBase
    {
        public AppDb Db { get; }

        public ExamenPoderController(AppDb db)
        {
            Db = db;
        }

        [Route("api/examenpoder/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getprofesorexamenes dada una idexamen
        /// </summary>
        public async Task<IActionResult> GetPoderExamenes(int id)
        {
            await Db.Connection.OpenAsync();
            ExamenPoder examen = new ExamenPoder(Db);
            var result = await examen.GetPoderExamenes(id);
            return new OkObjectResult(result);
        }

        // POST "api/examen/{idE:int}/poder/{idP:int}"
        [Route("api/examen/{idE:int}/poder/{idP:int}")]
        [HttpPost]
        public async Task<IActionResult> InsertExamenPoder(int idE, int idP)
        {
            await Db.Connection.OpenAsync();
            ExamenPoder ep = new ExamenPoder(Db);
            await ep.InsertExPo(idE, idP);
            return new OkResult();
        }
    }
}