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
    public class Grupo
    {
        public int IdGrupo { get; set; }
        public string Nombre { get; set; }
        public int IdProfesor { get; set; }

        [JsonConstructor]
        public Grupo(string Nombre, int IdProfesor)
        {
            this.Nombre = Nombre;
            this.IdProfesor= IdProfesor;
        }


        internal AppDb Db { get; set; }

        internal Grupo(AppDb db) { Db = db; }


        public async Task<List<Grupo>> GetGruposProfesor(int idProfesor)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_grupos_profesor";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idP", idProfesor);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Grupo>> GetGrupo(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_grupo";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        private async Task<List<Grupo>> ReadAllAsync(MySqlDataReader reader)
        {
            var grupos = new List<Grupo>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var grupo = new Grupo(Db)
                    {
                        IdGrupo = reader.GetInt32(0),
                        Nombre = reader.GetString(1),
                        IdProfesor = reader.GetInt32(2)
                    };
                    grupos.Add(grupo);
                }
            }
            return grupos;
        }




    }

}
