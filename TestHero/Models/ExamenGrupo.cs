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
    public class ExamenGrupo
    {
        public int IdExamen { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaFin { get; set; }
        public string Grupo { get; set; }


        [JsonConstructor]
        public ExamenGrupo(int IdExamen, string Nombre, DateTime FechaInicio, DateTime FechaFin, string Grupo)
        {
            this.IdExamen = IdExamen;
            this.Nombre = Nombre;
            this.FechaFin = FechaFin;
            this.Grupo = Grupo;
        }


        internal AppDb Db { get; set; }

        internal ExamenGrupo(AppDb db) { Db = db; }


        public async Task<List<ExamenGrupo>> GetProfesorExamenesActivos(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_profesor_examenes_activos";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idP", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        private async Task<List<ExamenGrupo>> ReadAllAsync(MySqlDataReader reader)
        {
            var examenes = new List<ExamenGrupo>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var examen = new ExamenGrupo(Db)
                    {
                        IdExamen = reader.GetInt32(0),
                        Nombre = reader.GetString(1),
                        FechaFin = reader.GetDateTime(2),
                        Grupo = reader.GetString(3)
                    };
                    examenes.Add(examen);
                }
            }
            return examenes;
        }




    }

}
