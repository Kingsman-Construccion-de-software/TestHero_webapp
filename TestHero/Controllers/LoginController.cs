using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using TestHero.Models;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        string constring = "Server=127.0.0.1;Port=3306;Database=testhero;Uid=root;password=123;";
        MySqlCommand cmd = null;

        [HttpPost]
        public string Login(Profesor profesor)
        {
            string msg = string.Empty;
            try
            {
                DataTable dt = new DataTable();
                MySqlConnection conn = new MySqlConnection(constring);
                MySqlCommand cmd = new MySqlCommand("get_profesor_by_correo");
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = conn;
                cmd.Parameters.AddWithValue("@corr", profesor.Correo);
                MySqlDataAdapter sda = new MySqlDataAdapter(cmd);
                sda.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    cmd = new MySqlCommand("get_profesor");
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = conn;
                    cmd.Parameters.AddWithValue("@corr", profesor.Correo);
                    cmd.Parameters.AddWithValue("@pass", profesor.Password);
                    sda = new MySqlDataAdapter(cmd);
                    dt = new DataTable();
                    sda.Fill(dt);
                    if(dt.Rows.Count > 0)
                    {
                        msg = "Login exitoso.";
                    }
                    else
                    {
                        msg = "El usuario y contraseña no coinciden. Inténtalo de nuevo.";
                    }
                }
                else
                {
                    msg = "El correo no se encuentra registrado, crea una nueva cuenta.";
                }

               
            } catch(Exception ex)
            {
                msg = "Ocurrió un error interno, vuelve a intentarlo.";
            }
            return msg;
        }

    }
}
