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
        public async Task<IActionResult> Post(int idEt, int idEx)
        {
            await Db.Connection.OpenAsync();
            Etiqueta etiqueta = new Etiqueta(Db);
            etiqueta.InsertEtiquetaExamen(idEt, idEx);
            return new OkResult();
        }


    }
}