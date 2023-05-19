using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{

    /// <summary>
    /// Modelo que une la tabla de grupo
    /// Aqui se definen todas las atributos de grupo
    /// como lo son idgrupo, nombre y idprofesor
    /// Tiene un constructor que define los datos
    /// 3 metodos que son: readallasync, GetGruposProfesor y GetGrupo
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

        /// <summary>
        /// Nos dice los grupos que tiene el profesor
        /// </summary>
        public async Task<List<Grupo>> GetGruposProfesor(int idProfesor)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_grupos_profesor";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idP", idProfesor);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }
        /// <summary>
        /// Nos da todos los grupos
        /// </summary>
        public async Task<List<Grupo>> GetGrupo(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_grupo";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Agrega los grupos
        /// </summary>
        public async Task InsertGrupo()
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"insert_grupo";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nom", Nombre);
            cmd.Parameters.AddWithValue("@idP", IdProfesor);
            await cmd.ExecuteNonQueryAsync();
            using MySqlCommand cmdInt = Db.Connection.CreateCommand();
            cmdInt.CommandText = @"SELECT MAX(IdGrupo) FROM grupo;";
            IdGrupo = Convert.ToInt32(cmdInt.ExecuteScalar());
        }
        /// <summary>
        /// Lectura de todos los atributos de grupo
        /// </summary>
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
