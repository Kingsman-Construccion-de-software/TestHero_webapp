using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{

    /// <summary>
    /// Summary description for Class1
    /// </summary>
    public class Etiqueta
    {
        public int IdEtiqueta { get; set; }
        public string Nombre { get; set; }

        [JsonConstructor]
        public Etiqueta(string Nombre)
        {
            this.Nombre = Nombre;
        }


        internal AppDb Db { get; set; }

        internal Etiqueta(AppDb db) { Db = db; }


        public async Task<List<Etiqueta>> GetEtiquetasExamen(int idProfesor)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_etiquetas_examen";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idE", idProfesor);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Etiqueta>> GetEtiqueta(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_etiqueta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task InsertEtiquetaExamen(int idEt, int idEx)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert_etiquetas_examen";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idEx", idEx);
            cmd.Parameters.AddWithValue("@idEt", idEt);
            await cmd.ExecuteNonQueryAsync();
            using MySqlCommand cmdInt = Db.Connection.CreateCommand();
        }

        private async Task<List<Etiqueta>> ReadAllAsync(MySqlDataReader reader)
        {
            var etiquetas = new List<Etiqueta>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var etiqueta = new Etiqueta(Db)
                    {
                        IdEtiqueta = reader.GetInt32(0),
                        Nombre = reader.GetString(1),
                    };
                    etiquetas.Add(etiqueta);
                }
            }
            return etiquetas;
        }




    }

}
