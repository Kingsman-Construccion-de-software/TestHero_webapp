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
    public class AlumnoExamen
    {

        public int IdAlumno { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public int Calificacion { get; set; }


        [JsonConstructor]
        public AlumnoExamen(string Nombres, string Apellidos, int Calificacion)
        {
            this.Nombres = Nombres;
            this.Apellidos = Apellidos;
            this.Calificacion = Calificacion;
        }

        internal AppDb Db { get; set; }

        internal AlumnoExamen(AppDb db) { Db = db; }

        public async Task<List<AlumnoExamen>> GetAlumnosExamen(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_alumnos_examen";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idE", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

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
                        Calificacion = reader.GetInt32(3)        
                    };
                    alumnos.Add(alumno);
                }
            }
            return alumnos;
        }




    }

}
