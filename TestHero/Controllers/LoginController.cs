﻿using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Dynamic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]
    public class LoginController : ControllerBase
    {
        public AppDb Db { get; }

        public LoginController(AppDb db)
        {
            Db = db;
        }

        //POST api/login
        [Route("api/login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            string msg = "";
            int idUsuario = 0;
            
            try
            {
                await Db.Connection.OpenAsync();
                user.Db = Db;
                var result = await user.GetUser();
                if(result.Count == 0)
                {
                    msg = "El correo no se encuentra registrado, crea una nueva cuenta.";
                } else
                {
                    result = await user.ValidateUser();
                    if (result.Count == 0)
                    {
                        msg = "El usuario y contraseña no coinciden. Inténtalo de nuevo.";
                    } else
                    {
                        idUsuario = result[0].Id;
                        msg = "Login exitoso";
                    }
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            dynamic res = new ExpandoObject();
            res.message = msg;
            res.id = idUsuario;

            return new OkObjectResult(res);

        }

    }
}
