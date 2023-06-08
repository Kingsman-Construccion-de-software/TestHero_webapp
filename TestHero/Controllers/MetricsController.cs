using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]

    public class MetricsController : ControllerBase
    {
        public AppDb Db { get; }

        public MetricsController(AppDb db)
        {
            Db = db;
        }

        // GET api/examen/id/promedio
        [Route("api/examen/{id:int}/promedio")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de promedio de un examen
        /// </summary>
        public async Task<IActionResult> GetExamenPromedio(int id)
        {
            await Db.Connection.OpenAsync();
            Metrica metrica = new Metrica(Db);
            var result = await metrica.GetExamenPromedio(id);
            return new OkObjectResult(result);
        }

        // GET api/examen/id/desvest
        [Route("api/examen/{id:int}/desvest")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de desviación estándar de un examen
        /// </summary>
        public async Task<IActionResult> GetExamenDesvest(int id)
        {
            await Db.Connection.OpenAsync();
            Metrica metrica = new Metrica(Db);
            var result = await metrica.GetExamenDesvest(id);
            return new OkObjectResult(result);
        }

        // GET api/examen/id/tasaaprob
        [Route("api/examen/{id:int}/tasaaprob")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de tasa de aprobamiento de un examen
        /// </summary>
        public async Task<IActionResult> GetTasaAprob(int id)
        {
            await Db.Connection.OpenAsync();
            Metrica metrica = new Metrica(Db);
            var result = await metrica.GetTasaAprob(id);
            return new OkObjectResult(result);
        }

        // GET api/examen/id/
        [Route("api/examen/{id:int}/masdificil")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de pregunta mas difícil de un examen
        /// </summary>
        public async Task<IActionResult> GetPregMasDificil(int id)
        {
            await Db.Connection.OpenAsync();
            Metrica metrica = new Metrica(Db);
            var result = await metrica.GetPregMasDificil(id);
            return new OkObjectResult(result);
        }


    }
}
