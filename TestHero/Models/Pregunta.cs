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
	public class Pregunta
	{
        public int IdPregunta { get; set; }

        public int IdExamen { get; set; }
        public string TextoPregunta { get; set; }

        [JsonConstructor]
        public Pregunta(int IdExamen, string TextoPregunta)
        {
            this.IdExamen = IdExamen;
            this.TextoPregunta = TextoPregunta;
        }


        internal AppDb Db { get; set; }

		internal Pregunta(AppDb db) { Db = db; }


        public async Task<List<Pregunta>> GetExamenPreguntas(int idExamen)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_preguntas_examen";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idE", idExamen);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Pregunta>> GetPregunta(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_pregunta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task InsertPregunta()
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert_pregunta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@preg", TextoPregunta);
            cmd.Parameters.AddWithValue("@idE", IdExamen);
            await cmd.ExecuteNonQueryAsync();
            using MySqlCommand cmdInt = Db.Connection.CreateCommand();
            cmdInt.CommandText = @"SELECT MAX(idPregunta) FROM pregunta;";
            IdPregunta = Convert.ToInt32(cmdInt.ExecuteScalar());
        }

        public async Task UpdatePregunta(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"update_pregunta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@preg", TextoPregunta);
            await cmd.ExecuteNonQueryAsync();
        }

        public async Task DeletePregunta(int id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"delete_pregunta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            await cmd.ExecuteNonQueryAsync();
        }

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
                    };
                    preguntas.Add(pregunta);
                }
            }
            return preguntas;
        }




    }

}
