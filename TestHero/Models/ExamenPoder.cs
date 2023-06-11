namespace TestHero;

using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Data;
using System.Text.Json.Serialization;

public class ExamenPoder
{
    public int idExamen { get; set; }
    public int idPoder { get; set; }

    [JsonConstructor]
    public ExamenPoder(int idExamen, int idPoder)
    {
        this.idExamen = idExamen;
        this.idPoder = idPoder;
    }

    internal AppDb Db { get; set; }

    internal ExamenPoder(AppDb db)
    { Db = db; }

    public async Task InsertExPo(int idExamen, int idPoder)
    {
        using MySqlCommand cmd = Db.Connection.CreateCommand();
        cmd.CommandText = @"insert_examen_poder"; // nombre del procedure
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@idE", idExamen);
        cmd.Parameters.AddWithValue("@idP", idPoder);
        await cmd.ExecuteNonQueryAsync();
    }

    /// <summary>
    /// Nos dice el id de x Poder
    /// </summary>
    public async Task<List<ExamenPoder>> GetPoderExamenes(int id)
    {
        using MySqlCommand cmd = Db.Connection.CreateCommand();
        cmd.CommandText = @"get_poderExamen";
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@idE", id);
        return await ReadAllAsync(await cmd.ExecuteReaderAsync());
    }

    /// <summary>
    /// Elimina cierta pregunra dado su idPregunta
    /// </summary>
    public async Task DeletePoder(int idE, int idP)
    {
        using var cmd = Db.Connection.CreateCommand();
        cmd.CommandText = @"delete_poder";
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@idE", idExamen);
        cmd.Parameters.AddWithValue("@idP", idPoder);
        await cmd.ExecuteNonQueryAsync();
    }
    private async Task<List<ExamenPoder>> ReadAllAsync(MySqlDataReader reader)
    {
        var examenes = new List<ExamenPoder>();
        using (reader)
        {
            while (await reader.ReadAsync())
            {
                var examen = new ExamenPoder(Db)
                {
                    idExamen = reader.GetInt32(0),
                    idPoder = reader.GetInt32(1),
                    
                };
                examenes.Add(examen);
            }
        }
        return examenes;
    }
}