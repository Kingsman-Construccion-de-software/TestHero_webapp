using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using TestHero.Models;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestHero.Controllers
{

    [RoutePrefix("Api")]
    public class LoginController : ApiController
    {
        SqlConnection conn = new SqlConnection("Server=127.0.0.1;Port=3306;Database=testhero;Uid=root;password=123;");
        SqlCommand cmd = null;
        SqlDataAdapter da = null;

        [HttpPost]
        [Route("Login")]
        public string Login(Profesor profesor)
        {
            string msg = string.Empty;
            try
            {
               da = new SqlDataAdapter("get_profesor", conn);
               da.SelectCommand.CommandType = CommandType.StoredProcedure;
               da.SelectCommand.Parameters.AddWithValue("@correo", profesor.Correo);
               da.SelectCommand.Parameters.AddWithValue("@password", profesor.Password);
               DataTable dt = new DataTable();
               da.Fill(dt);
               if(dt.Rows.Count > 0)
                {
                    msg = "User is valid";
                } else
                {
                    msg = "User is invalid";
                }
            } catch(Exception ex)
            {
                msg = ex.Message;
            }
            return msg;

        }

        
    }
}
