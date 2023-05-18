using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{

    /// <summary>
    /// Modelo que une la tabla de usuario
    /// Aqui se definen todas las atributos de usuario
    /// como lo son id, correo y password
    /// Tiene un constructor que define los datos
    /// 4 metodos que son: GetUser,  ValidateUse ,  ReadCorreoAsync y   ReadUserAsync
    /// </summary>
    public class UserProfesor
    {
        public int Id { get; set; }

        public string Correo { get; set; }

        public string Password { get; set; }

        [JsonConstructor]
        public UserProfesor(string Correo, string Password)
        {
            this.Correo = Correo;
            this.Password = Password;
        }


        internal AppDb Db { get; set; }

        internal UserProfesor(AppDb db) { Db = db; }

        /// <summary>
        /// Nos da el usuario
        /// </summary>
        public async Task<List<UserProfesor>> GetUser()
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = "get_profesor_by_correo";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@corr", Correo);
            return await ReadCorreoAsync(await cmd.ExecuteReaderAsync());
        }
        /// <summary>
        /// LVerifica si el usuario es valido o esta en la base de datos
        /// </summary>
        public async Task<List<UserProfesor>> ValidateUser()
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_profesor";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@corr", Correo);
            cmd.Parameters.AddWithValue("@pass", Password);
            return await ReadUserAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Lectura de todos los atributos de usuario
        /// </summary>
        private async Task<List<UserProfesor>> ReadUserAsync(MySqlDataReader reader)
        {
            var users= new List<UserProfesor>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var user = new UserProfesor(Db)
                    {
                        Correo = reader.GetString(0),
                        Password = reader.GetString(1),
                        Id = reader.GetInt32(2)
                    };
                    users.Add(user);
                }
            }
            return users;
        }
        /// <summary>
        /// Lectura de todos los atributos de correo
        /// </summary>
        private async Task<List<UserProfesor>> ReadCorreoAsync(MySqlDataReader reader)
        {
            var users = new List<UserProfesor>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var user = new UserProfesor(Db)
                    {
                        Correo = reader.GetString(0),
                    };
                    users.Add(user);
                }
            }
            return users;
        }




    }

}
