using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{

    /// <summary>
    /// Modelo que une la tabla de pregunta
    /// Aqui se definen todas las atributos de pregunta
    /// como lo son idpregunta,idexamen y textopregunta
    /// Tiene un constructor que define los datos
    /// 6 metodos que son: GetExamenPregunta, GetPregunta, InsertPregunta, UpdatePregunta,DeletePregunta y ReadAllAsync
    /// </summary>
	public class Pregunta
	{
        public int IdPregunta { get; set; }

        public int IdExamen { get; set; }
        public string TextoPregunta { get; set; }
        public int? IdEtiqueta { get; set; }

        [JsonConstructor]
        public Pregunta(int IdExamen, string TextoPregunta, int? IdEtiqueta)
        {
            this.IdExamen = IdExamen;
            this.TextoPregunta = TextoPregunta;
            this.IdEtiqueta = IdEtiqueta;
        }


        internal AppDb Db { get; set; }

		internal Pregunta(AppDb db) { Db = db; }

        /// <summary>
        /// Nos da las preguntas del examen
        /// </summary>
        public async Task<List<Pregunta>> GetExamenPreguntas(int idExamen)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_preguntas_examen";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idE", idExamen);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }
        /// <summary>
        /// Nos da todas las preguntas
        /// </summary>
        public async Task<List<Pregunta>> GetPregunta(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_pregunta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }
        /// <summary>
        /// Agrega las preguntas
        /// </summary>
        public async Task InsertPregunta()
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            
            
                cmd.CommandText = @"insert_pregunta";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@preg", TextoPregunta);
                cmd.Parameters.AddWithValue("@idEt", IdEtiqueta);
                cmd.Parameters.AddWithValue("@idE", IdExamen);
            
              
            await cmd.ExecuteNonQueryAsync();
            using MySqlCommand cmdInt = Db.Connection.CreateCommand();
            cmdInt.CommandText = @"SELECT MAX(idPregunta) FROM pregunta;";
            IdPregunta = Convert.ToInt32(cmdInt.ExecuteScalar());
        }
        /// <summary>
        /// Actualiza cierta pregunta dado su idPregunta
        /// </summary>
        public async Task UpdatePregunta(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"update_pregunta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@preg", TextoPregunta);
            cmd.Parameters.AddWithValue("@idEt", IdEtiqueta);
            await cmd.ExecuteNonQueryAsync();
            IdPregunta = id;
        }
        /// <summary>
        /// Elimina cierta pregunra dado su idPregunta
        /// </summary>
        public async Task DeletePregunta(int id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"delete_pregunta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            await cmd.ExecuteNonQueryAsync();
        }
        /// <summary>
        /// Lectura de todos los atributos de pregunta
        /// </summary>
        private async Task<List<Pregunta>> ReadAllAsync(MySqlDataReader reader)
        {
            var preguntas = new List<Pregunta>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var pregunta = new Pregunta(Db)
                    {
                        IdPregunta = reader.GetInt32(0),
                        TextoPregunta = reader.GetString(1),
                        IdExamen = reader.GetInt32(2)
                    };

                    try
                    {
                        pregunta.IdEtiqueta = reader.GetInt32(3);
                    }
                    catch (Exception e)
                    {
                     
                    }

                    preguntas.Add(pregunta);
                }
            }
            return preguntas;
        }

    }

}
