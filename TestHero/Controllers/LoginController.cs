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
                using(MySqlConnection conn = new MySqlConnection(constring))
                {
                    using(MySqlCommand cmd = new MySqlCommand("get_profesor"))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Connection = conn;
                        cmd.Parameters.AddWithValue("@corr", profesor.Correo);
                        cmd.Parameters.AddWithValue("@pass", profesor.Password);
                        using (MySqlDataAdapter sda = new MySqlDataAdapter(cmd))
                        {
                            sda.Fill(dt);

                            if (dt.Rows.Count > 0)
                            {
                                msg = "User is valid";
                            }
                            else
                            {
                                msg = "User is invalid";
                            }
                        }
                    }
                }
            } catch(Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }

    }
}
