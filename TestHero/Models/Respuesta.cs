using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{

    /// <summary>
    /// Modelo que une la tabla de respuesta
    /// Aqui se definen todas las atributos de respuesta
    /// como lo son idrespuesta, textorespuesta, escorrecta y idpregunta
    /// Tiene un constructor que define los datos
    /// 5 metodos que son: GetPreguntaRespuestas,  GetRespuesta, InsertRespuesta,  UpdateRespuesta y ReadAllAsync
    /// </summary>
    public class Respuesta
    {
        public int IdRespuesta { get; set; }
        public string TextoRespuesta { get; set; }
        public int EsCorrecta { get; set; }
        public int IdPregunta { get; set; }

        [JsonConstructor]
        public Respuesta(string TextoRespuesta, int EsCorrecta, int IdPregunta)
        {
            this.TextoRespuesta =TextoRespuesta;
            this.EsCorrecta = EsCorrecta;
            this.IdPregunta = IdPregunta;
        }


        internal AppDb Db { get; set; }

        internal Respuesta(AppDb db) { Db = db; }

        /// <summary>
        /// Nos da las respuestas dado un idPregunta
        /// </summary>
        public async Task<List<Respuesta>> GetPreguntaRespuestas(int idPregunta)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_respuestas_pregunta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idP", idPregunta);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }
        /// <summary>
        /// Nos da todas las respuestas
        /// </summary>
        public async Task<List<Respuesta>> GetRespuesta(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_respuesta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }
        /// <summary>
        /// Agrega una respuesta
        /// </summary>
        public async Task InsertRespuesta()
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert_respuesta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@resp", TextoRespuesta);
            cmd.Parameters.AddWithValue("@corr", EsCorrecta);
            cmd.Parameters.AddWithValue("@idP", IdPregunta);
            await cmd.ExecuteNonQueryAsync();
            using MySqlCommand cmdInt = Db.Connection.CreateCommand();
            cmdInt.CommandText = @"SELECT MAX(idRespuesta) FROM respuesta;";
            IdRespuesta = Convert.ToInt32(cmdInt.ExecuteScalar());
        }
        /// <summary>
        /// Actualiza una respuesta dado un idRespuesta
        /// </summary>
        public async Task UpdateRespuesta(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"update_respuesta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@resp", TextoRespuesta);
            cmd.Parameters.AddWithValue("@corr", EsCorrecta);
            IdRespuesta = id;
            await cmd.ExecuteNonQueryAsync();
        }
        /// <summary>
        /// Lectura de todos los atributos de respuesta
        /// </summary>
        private async Task<List<Respuesta>> ReadAllAsync(MySqlDataReader reader)
        {
            var respuestas = new List<Respuesta>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var respuesta = new Respuesta(Db)
                    {
                        IdRespuesta = reader.GetInt32(0),
                        TextoRespuesta = reader.GetString(1),
                        EsCorrecta = reader.GetInt32(2),
                        IdPregunta = reader.GetInt32(3)
                    };
                    respuestas.Add(respuesta);
                }
            }
            return respuestas;
        }




    }

}
