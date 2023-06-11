using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]

    public class EtiquetaController : ControllerBase
    {
        public AppDb Db { get; }

        public EtiquetaController(AppDb db)
        {
            Db = db;
        }

        // GET api/etiqueta/examen/id
        [Route("api/etiqueta/examen/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getetiquetasexamen
        /// </summary>
        public async Task<IActionResult> GetEtiquetasExamen(int id)
        {
            await Db.Connection.OpenAsync();
            Etiqueta etiqueta = new Etiqueta(Db);
            var result = await etiqueta.GetEtiquetasExamen(id);
            return new OkObjectResult(result);
        }

        // GET api/etiqueta
        [Route("api/etiqueta")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getetiqueta
        /// </summary>
        public async Task<IActionResult> GetEtiquetas(int id)
        {
            await Db.Connection.OpenAsync();
            Etiqueta etiqueta = new Etiqueta(Db);
            var result = await etiqueta.GetEtiquetas(id);
            return new OkObjectResult(result);
        }

        // DELETE api/<Pregunta>/id
        [Route("api/etiqueta/{id:int}")]
        [HttpDelete]
        /// <summary>
        /// Rutamiento de delete por idPregunta
        /// </summary>
        public async Task<IActionResult> Delete(int id)
        {
            await Db.Connection.OpenAsync();
            Etiqueta pregunta = new Etiqueta(Db);
            var result = await pregunta.GetEtiquetasExamen(id);
            if (result.Count == 0)
                return new NotFoundResult();
            await pregunta.DeleteEtiqueta(id);
            return new OkResult();
        }

        // GET: api/etiqueta/id
        [Route("api/etiqueta/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getetiqueta por id
        /// </summary>
        public async Task<IActionResult> GetEtiqueta(int id)

        {
            await Db.Connection.OpenAsync();
            Etiqueta etiqueta = new Etiqueta(Db);
            var result = await etiqueta.GetEtiqueta(id);
            return new OkObjectResult(result);
        }

        // GET: api/etiquetanomre/id
        [Route("api/etiquetanombre/{id:int}")]
        [HttpGet]
        /// <summary>
        /// Rutamiento de getetiqueta para obtener el nombre
        /// </summary>
        public async Task<IActionResult> GetNombreEtiqueta(int id)

        {
            await Db.Connection.OpenAsync();
            Etiqueta etiqueta = new Etiqueta(Db);
            var result = await etiqueta.GetNombreEtiqueta(id);
            return new OkObjectResult(result);
        }

        // POST api/etiqueta/idEtiqueta/examen/idExamen
        [Route("api/etiqueta/{idEt:int}/examen/{idEx:int}")]
        [HttpPost]
        /// <summary>
        /// Rutamiento de insertaexamen dado una idetiqueta y un idexamen
        /// </summary>
        public async Task<IActionResult> InsertEtiquetaExamen(int idEt, int idEx)
        {
            await Db.Connection.OpenAsync();
            Etiqueta etiqueta = new Etiqueta(Db);
            await etiqueta.InsertEtiquetaExamen(idEt, idEx);
            return new OkResult();
        }

        // POST api/etiqueta/idEtiqueta/examen/idExamen
        [Route("api/etiqueta/")]
        [HttpPost]
        /// <summary>
        /// Rutamiento de insertetiqueta
        /// </summary>
        public async Task<IActionResult> InsertEtiqueta([FromBody] Etiqueta etiqueta)
        {
            await Db.Connection.OpenAsync();
            etiqueta.Db = Db;
            await etiqueta.InsertEtiqueta();
            return new OkObjectResult(etiqueta);
        }


    }
}