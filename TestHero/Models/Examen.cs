using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{

      
    /// <summary>
    /// Modelo que une la tabla de examen
    /// Aqui se definen todas las atributos de examen
    /// como lo son idexamen,codigo,nombre,materia,fechadeinicio,fechafin y idgrupo
    /// Tiene un constructor que define los datos
    /// 4 metodos que son: getgruposexamen,readallasync,getexamen y insertexamen
    /// </summary>
    public class Examen
    {
        public int IdExamen { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Materia { get; set; }
        public  DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public int IdGrupo { get; set; }


        [JsonConstructor]
        public Examen(string Codigo, string Nombre, string Materia, DateTime FechaInicio, DateTime FechaFin, int idGrupo)
        {
            this.Codigo = Codigo;
            this.Nombre = Nombre;
            this.Materia = Materia;
            this.FechaInicio = FechaInicio;
            this.FechaFin = FechaFin;
            this.IdGrupo = idGrupo;
        }


        internal AppDb Db { get; set; }

        internal Examen(AppDb db) { Db = db; }

        /// <summary>
        /// Nos dice los examenes de acuerdo a un ide de grupo
        /// </summary>
        public async Task<List<Examen>> GetGrupoExamenes(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_grupo_examenes";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idG", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }
        /// <summary>
        /// Nos dice el examen de acuerdo a un idexamen
        /// </summary>
        public async Task<List<Examen>> GetExamen(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_examen";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Nos dice el examen de acuerdo a su codigo
        /// </summary>
        public async Task<List<Examen>> GetExamenCodigo(string codigo)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_examen_codigo";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@cod", codigo);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }


        /// <summary>
        /// agregamos un examen
        /// </summary>
        public async Task InsertExamen()
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert_examen";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@cod", Codigo);
            cmd.Parameters.AddWithValue("@nom", Nombre);
            cmd.Parameters.AddWithValue("@mat", Materia);
            cmd.Parameters.AddWithValue("@fInicio", FechaInicio);
            cmd.Parameters.AddWithValue("@fFin", FechaFin);
            cmd.Parameters.AddWithValue("@idG", IdGrupo);
            await cmd.ExecuteNonQueryAsync();
            using MySqlCommand cmdInt = Db.Connection.CreateCommand();
            cmdInt.CommandText = @"SELECT MAX(idExamen) FROM examen;";
            IdExamen = Convert.ToInt32(cmdInt.ExecuteScalar());
        }

        /// <summary>
        /// Metodo que nos ayuda a obtener los examenes del alumno 
        /// </summary>
        public async Task<List<Examen>> GetAlumnosExamenes(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_alumnos_examenes";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Lectura de todos los atributos de examen
        /// </summary>
        private async Task<List<Examen>> ReadAllAsync(MySqlDataReader reader)
        {
            var examenes = new List<Examen>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var examen = new Examen(Db)
                    {
                        IdExamen = reader.GetInt32(0),
                        Codigo = reader.GetString(1),
                        Nombre = reader.GetString(2),
                        Materia = reader.GetString(3),
                        FechaInicio = reader.GetDateTime(4),
                        FechaFin = reader.GetDateTime(5),
                        IdGrupo = reader.GetInt32(6)
                    };
                    examenes.Add(examen);
                }
            }
            return examenes;
        }




    }

}
