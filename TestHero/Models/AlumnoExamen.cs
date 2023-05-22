using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{

    
    /// <summary>
    /// Modelo que une la tabla de alumno y etiquetas
    /// Aqui se definen todas las atributos de alumnoetiqueta
    /// como lo son idalumno,nomhre,apellido y calificaccion
    /// Tiene un constructor que define los datos
    /// 2 metodos que son: GetAlumnosExamen y  ReadAllAsync
    /// </summary>
    public class AlumnoExamen
    {

        public int IdAlumno { get; set; }

        public int IdExamen { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public int Calificacion { get; set; }
        public int Puntaje { get; set; }
        public DateTime FechaRealizacion { get; set; }

      
        [JsonConstructor]
        public AlumnoExamen(int IdAlumno, int IdExamen, int Calificacion, int Puntaje)
        {
            this.IdAlumno = IdAlumno;
            this.IdExamen = IdExamen;
            this.Nombres = "";
            this.Apellidos = "";
            this.Calificacion = Calificacion;
            this.Puntaje = Puntaje;
        }

        internal AppDb Db { get; set; }

        internal AlumnoExamen(AppDb db) { Db = db; }
        /// <summary>
        /// Metodo para obtener los alumnos que tiene un examen y recibe un Id como parametro
        /// </summary>
        public async Task<List<AlumnoExamen>> GetAlumnosExamen(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_alumnos_examen";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idE", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<AlumnoExamen>> GetAlumnoExamen(int idA, int idE)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_alumno_examen";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idA", idA);
            cmd.Parameters.AddWithValue("@idE", idE);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Funcion que inserta alumnos en un examen
        /// </summary>
        public async Task InsertAlumnoExamen()
        {
            FechaRealizacion = DateTime.Now;
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert_alumnos_examen";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idA", IdAlumno);
            cmd.Parameters.AddWithValue("@idE", IdExamen);
            cmd.Parameters.AddWithValue("@cal", Calificacion);
            cmd.Parameters.AddWithValue("@pun", Puntaje);
            cmd.Parameters.AddWithValue("@fecha", FechaRealizacion);

            await cmd.ExecuteNonQueryAsync();
            using MySqlCommand cmdInt = Db.Connection.CreateCommand();
        }

        /// <summary>
        /// Funcion dedicada a leer todos los elementos de la lista
        /// </summary>
        private async Task<List<AlumnoExamen>> ReadAllAsync(MySqlDataReader reader)
        {
            var alumnos = new List<AlumnoExamen>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var alumno = new AlumnoExamen(Db)
                    {
                        IdAlumno = reader.GetInt32(0),
                        Nombres = reader.GetString(1),
                        Apellidos = reader.GetString(2),
                        Calificacion = reader.GetInt32(3),     
                        Puntaje = reader.GetInt32(4),
                        FechaRealizacion = reader.GetDateTime(5)
                    };
                    alumnos.Add(alumno);
                }
            }
            return alumnos;
        }




    }

}
