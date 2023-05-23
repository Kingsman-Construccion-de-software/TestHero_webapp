using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using MySqlConnector;
using TestHero;
/// <summary>
/// Modelo que une la tabla de alumno
/// Aqui se definen todas las atributos de alumno
/// como lo son  idalumno, nombre, apellido, matricula, correo, password y idGrupo
/// </summary>
public class Alumno
{
    public int IdAlumno { get; set; }
    public string Nombres { get; set; }
    public string Apellidos { get; set; }
    public string Matricula { get; set; }
    public string Correo { get; set; }
    public string Password { get; set; }
    public int IdGrupo { get; set; }

    [JsonConstructor]
    public Alumno(string Nombres,string Apellidos, string Matricula, string Correo,
        string Password, int IdGrupo)
    {
     
        this.Nombres = Nombres;
        this.Apellidos = Apellidos;
        this.Matricula = Matricula;
        this.Correo = Correo;
        this.Password = Password;
        this.IdGrupo = IdGrupo;
    }


    internal AppDb Db { get; set; }

    internal Alumno(AppDb db) { Db = db; }

    /// <summary>
    /// Nos da un grupo por id
    /// </summary>
    public async Task<List<Alumno>> GetGrupoAlumno(int idGrupo)
    {
        using MySqlCommand cmd = Db.Connection.CreateCommand();
        cmd.CommandText = @"get_alumnos_grupo";
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@idG", idGrupo);
        return await ReadAllAsync(await cmd.ExecuteReaderAsync());
    }

    public async Task<List<Alumno>> GetAlumno(int idAlumno)
    {
        using MySqlCommand cmd = Db.Connection.CreateCommand();
        cmd.CommandText = @"get_alumno_full";
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@id", idAlumno);
        return await ReadAllAsync(await cmd.ExecuteReaderAsync());
    }
   

    private async Task<List<Alumno>> ReadAllAsync(MySqlDataReader reader)
    {
        var alumnos = new List<Alumno>();
        using (reader)
        {
            while (await reader.ReadAsync())
            {
                var alumno = new Alumno(Db)
                {
     
                    Nombres = reader.GetString(0), 
                    Apellidos = reader.GetString(1), 
                    Correo = reader.GetString(2),
                };
             
                alumnos.Add(alumno);
            }
        }
        return alumnos;
    }
    
}
