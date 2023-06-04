using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{

        
    /// <summary>
    /// Modelo que une la tabla de etiqueta
    /// Aqui se definen todas las atributos de etiqueta
    /// como lo son idetiqueta y nombre
    /// Tiene un constructor que define los datos
    /// contiene varios metodos:
    /// getetiquetaexamen,fetetiquetas,getetiqueta,, insertetiqueta,insertetiquetaexamen,readallasync
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

        /// <summary>
        /// Nos dice las etiquetas de cierto examen dado el id del profesor
        /// </summary>
        public async Task<List<Etiqueta>> GetEtiquetasExamen(int idExamen)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_etiquetas_examen";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idE", idExamen);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }
        /// <summary>
        /// Nos dice las etiquetas todas las etiquetas que tenemos dado un id
        /// </summary>
        public async Task<List<Etiqueta>> GetEtiquetas(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_etiquetas";
            cmd.CommandType = CommandType.StoredProcedure;
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }
        /// <summary>
        /// Nos dice las etiquetas de cierta etiqueta dado un id
        /// </summary>
        public async Task<List<Etiqueta>> GetEtiqueta(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_etiqueta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Nos dice las etiquetas de cierta etiqueta dado un id
        /// </summary>
        public async Task<List<Etiqueta>> GetNombreEtiqueta(int idP)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_nombretiqueta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idP", idP);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Funcion para agregar etiquetas
        /// </summary>
        public async Task InsertEtiqueta()
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert_etiqueta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nom", Nombre);
            await cmd.ExecuteNonQueryAsync();
            using MySqlCommand cmdInt = Db.Connection.CreateCommand();
            cmdInt.CommandText = @"SELECT MAX(idEtiqueta) FROM etiqueta;";
            IdEtiqueta = Convert.ToInt32(cmdInt.ExecuteScalar());
        }
        /// <summary>
        /// Funcion que inserta etiquetas en un examen
        /// </summary>
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
        /// <summary>
        /// Nos dice las etiquetas de cierto examen dado el id del profesor
        /// </summary>
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
