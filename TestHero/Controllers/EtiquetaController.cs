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
        public async Task<IActionResult> GetEtiquetas(int id)
        {
            await Db.Connection.OpenAsync();
            Etiqueta etiqueta = new Etiqueta(Db);
            var result = await etiqueta.GetEtiquetas(id);
            return new OkObjectResult(result);
        }


        // GET: api/etiqueta/id
        [Route("api/etiqueta/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetEtiqueta(int id)

        {
            await Db.Connection.OpenAsync();
            Etiqueta etiqueta = new Etiqueta(Db);
            var result = await etiqueta.GetEtiqueta(id);
            return new OkObjectResult(result);
        }


        // POST api/etiqueta/idEtiqueta/examen/idExamen
        [Route("api/etiqueta/{idEt:int}/examen/{idEx:int}")]
        [HttpPost]
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
        public async Task<IActionResult> InsertEtiqueta([FromBody] Etiqueta etiqueta)
        {
            await Db.Connection.OpenAsync();
            etiqueta.Db = Db;
            await etiqueta.InsertEtiqueta();
            return new OkObjectResult(etiqueta);
        }


    }
}