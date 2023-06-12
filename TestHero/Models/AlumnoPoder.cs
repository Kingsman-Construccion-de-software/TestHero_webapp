namespace TestHero;

using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Data;
using System.Text.Json.Serialization;

public class AlumnoPoder
{
    public int IdAlumno { get; set; }
    public int IdPoder { get; set; }
    public int Cantidad { get; set; }

    [JsonConstructor]
    public AlumnoPoder(int idPoder, int cantidad)
    {
        this.IdPoder = idPoder;
        this.Cantidad = cantidad;
    }

    internal AppDb Db { get; set; }

    internal AlumnoPoder(AppDb db)
    { Db = db; }

   
    /// <summary>
    /// Regresa la lista de poderes de un alumno
    /// </summary>
    public async Task<List<AlumnoPoder>> GetPoderesAlumno(int id)
    {
        using MySqlCommand cmd = Db.Connection.CreateCommand();
        cmd.CommandText = @"get_alumnopoder";
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@idA", id);
        return await ReadAllAsync(await cmd.ExecuteReaderAsync());
    }

    /// <summary>
    /// Actualiza la cantidad de poderes
    /// </summary>
    public async Task UpdatePoderes(int id)
    {
        using MySqlCommand cmd = Db.Connection.CreateCommand();
        cmd.CommandText = @"update_alumnopoder";
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@idA", id);
        cmd.Parameters.AddWithValue("@idP", IdPoder);
        cmd.Parameters.AddWithValue("@can", Cantidad);

        await cmd.ExecuteNonQueryAsync();
    }


    private async Task<List<AlumnoPoder>> ReadAllAsync(MySqlDataReader reader)
    {
        var poderes = new List<AlumnoPoder>();
        using (reader)
        {
            while (await reader.ReadAsync())
            {
                var poder = new AlumnoPoder(Db)
                {
                    IdAlumno = reader.GetInt32(0),
                    IdPoder = reader.GetInt32(1),
                    Cantidad = reader.GetInt32(2)
                };
                poderes.Add(poder);
            }
        }
        return poderes;
    }
}