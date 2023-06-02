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
/// como lo son  idalumno, nombre, apellido, correo, password y idGrupo
/// </summary>
public class Alumno
{
    public int IdAlumno { get; set; }
    public string Nombres { get; set; }
    public string Apellidos { get; set; }
    public string Correo { get; set; }
    public string Password { get; set; }
    public int IdGrupo { get; set; }

    [JsonConstructor]
    public Alumno(string Nombres,string Apellidos, string Correo,
        string Password, int IdGrupo)
    {
     
        this.Nombres = Nombres;
        this.Apellidos = Apellidos;
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

    /// <summary>
    /// Nos dice todos los alumnos
    /// </summary>
    public async Task<List<Alumno>> GetAlumnos()
    {
        using MySqlCommand cmd = Db.Connection.CreateCommand();
        cmd.CommandText = @"dame_alumno";
        cmd.CommandType = CommandType.StoredProcedure;
        return await ReadAllAsync(await cmd.ExecuteReaderAsync());
    }
    /// <summary>
    /// Funcion para registrar al alumno
    /// </summary>
    public async Task InsertAlumno()
    {
        using MySqlCommand cmd = Db.Connection.CreateCommand();
        cmd.CommandText = @"registra_alumno";
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@nom", Nombres);
        cmd.Parameters.AddWithValue("@ape", Apellidos);
        cmd.Parameters.AddWithValue("@corr", Correo);
        cmd.Parameters.AddWithValue("@pass", Password);
        await cmd.ExecuteNonQueryAsync();
        using MySqlCommand cmdInt = Db.Connection.CreateCommand();
        cmdInt.CommandText = @"SELECT MAX(idAlumno) FROM alumno;";
        IdAlumno = Convert.ToInt32(cmdInt.ExecuteScalar());
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
