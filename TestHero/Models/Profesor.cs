using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{
    /// <summary>
    /// Modelo que une la tabla de profesor
    /// Aqui se definen todas las atributos de profesor
    /// como lo son idprofesor,nombre,apellido,correo y password
    /// Tiene un constructor que define los datos
    /// 2 metodos que son: GetProfesor y ReadAllAsync
    /// </summary>

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
        /// <summary>
        /// Nos dice todos los profesores
        /// </summary>
        public async Task<List<Profesor>> GetProfesor(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_profesor_full";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }


        /// <summary>
        /// Funcion para registrar al profesor 
        /// </summary>
        public async Task InsertProfesor()
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"registra_profesor";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nom",Nombre);
            cmd.Parameters.AddWithValue("@ape", Apellido);
            cmd.Parameters.AddWithValue("@corr", Correo);
            cmd.Parameters.AddWithValue("@pass", Password);
            await cmd.ExecuteNonQueryAsync();
            using MySqlCommand cmdInt = Db.Connection.CreateCommand();
            cmdInt.CommandText = @"SELECT MAX(idProfesor) FROM profesor;";
            IdProfesor = Convert.ToInt32(cmdInt.ExecuteScalar());
        }

        /// <summary>
        /// Lectura de todos los atributos de profesor
        /// </summary>
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
