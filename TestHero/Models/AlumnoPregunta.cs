using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{


    /// <summary>
    /// Modelo que une la tabla de alumno y pregunta
    /// Aqui se definen todas las atributos de alumnopregunta
    /// como lo son idalumno,idpregunta, idrespuesta
    /// Tiene un constructor que define los datos
    /// </summary>
    public class AlumnoPregunta
    {

        public int IdAlumno { get; set; }
        public int IdPregunta { get; set; }
        public int IdRespuesta { get; set; }


        [JsonConstructor]
        public AlumnoPregunta(int IdAlumno, int IdPregunta, int IdRespuesta)
        {
            this.IdAlumno = IdAlumno;
            this.IdPregunta = IdPregunta;
            this.IdRespuesta = IdRespuesta;
        }

        internal AppDb Db { get; set; }

        internal AlumnoPregunta(AppDb db) { Db = db; }

        /// <summary>
        /// Metodo para obtener la respuesta de un alumno para una pregunta y recibe un Id como parametro
        /// </summary>
        public async Task<List<AlumnoPregunta>> GetAlumnoPreguntas(int idA, int idE)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_alumnopreguntas";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idA", idA);
            cmd.Parameters.AddWithValue("@idE", idE);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }


        public async Task<List<AlumnoPregunta>> GetAlumnoPregunta(int idA, int idP)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_alumno_pregunta";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idA", idA);
            cmd.Parameters.AddWithValue("@idP", idP);

            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Metodo para insertar una respuesta de pregunta contestada por un alumno
        /// </summary>
        public async Task InsertAlumnoPregunta()
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            if (IdRespuesta == -1)
            {
                cmd.CommandText = @"insert_alumno_pregunta";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@idA", IdAlumno);
                cmd.Parameters.AddWithValue("@idP", IdPregunta);
            }
            else
            {
                cmd.CommandText = @"insert_alumno_pregunta_respuesta";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@idA", IdAlumno);
                cmd.Parameters.AddWithValue("@idP", IdPregunta);
                cmd.Parameters.AddWithValue("@idR", IdRespuesta);
            }


            await cmd.ExecuteNonQueryAsync();
            using MySqlCommand cmdInt = Db.Connection.CreateCommand();
        }



        /// <summary>
        /// Funcion dedicada a leer todos los elementos de la lista
        /// </summary>
        private async Task<List<AlumnoPregunta>> ReadAllAsync(MySqlDataReader reader)
        {
            var respuestas = new List<AlumnoPregunta>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var respuesta = new AlumnoPregunta(Db)
                    {
                        IdAlumno = reader.GetInt32(0),
                        IdPregunta = reader.GetInt32(1),
                        IdRespuesta = reader.GetInt32(2)
                    };
                    respuestas.Add(respuesta);
                }
            }
            return respuestas;
        }




    }

}