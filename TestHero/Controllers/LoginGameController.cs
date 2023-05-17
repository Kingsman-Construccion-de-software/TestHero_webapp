using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Dynamic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]
    public class LoginGameController : ControllerBase
    {
        public AppDb Db { get; }

        public LoginGameController(AppDb db)
        {
            Db = db;
        }

        //POST api/login/alumno
        [Route("api/login/alumno")]
        [HttpPost]
        /// <summary>
        /// Rutamiento de login
        /// </summary>
        public async Task<IActionResult> Login([FromBody] UserAlumno user)
        {
            string msg = "";
            int idUsuario = 0;

            try
            {
                await Db.Connection.OpenAsync();
                user.Db = Db;
                var result = await user.GetUser();
                if (result.Count == 0)
                {
                    msg = "Correo no registrado, crea una nueva cuenta.";
                }
                else
                {
                    result = await user.ValidateUser();
                    if (result.Count == 0)
                    {
                        msg = "Usuario y contraseña no coinciden, vuelve a intentar";
                    }
                    else
                    {
                        idUsuario = result[0].Id;
                        msg = "Login exitoso";
                    }
                }
            }
            catch (Exception ex)
            {
                msg = "Ocurrió un error interno. Vuelve a intentarlo.";
            }

            dynamic res = new ExpandoObject();
            res.message = msg;
            res.id = idUsuario;

            return new OkObjectResult(res);

        }

    }
}
