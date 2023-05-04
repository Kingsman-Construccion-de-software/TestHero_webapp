using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{
    public class Profesor
    {
        public int IdProfesor { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }
        public string Password { get; set; }

        [JsonConstructor]
        public Profesor(string Nombre, string Apellido, string Correo, string Password)
        {
            this.Nombre = Nombre;
            this.Apellido = Apellido;
            this.Correo = Correo;
            this.Password = Password;
        }


        internal AppDb Db { get; set; }

        internal Profesor(AppDb db) { Db = db; }

        public async Task<List<Profesor>> GetProfesor(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_profesor_full";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        private async Task<List<Profesor>> ReadAllAsync(MySqlDataReader reader)
        {
            var profesores = new List<Profesor>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var profesor = new Profesor(Db)
                    {
                        Nombre = reader.GetString(0),
                        Apellido = reader.GetString(1),
                        Correo = reader.GetString(2)
                    };
                    profesores.Add(profesor);
                }
            }
            return profesores;
        }
    }
}
