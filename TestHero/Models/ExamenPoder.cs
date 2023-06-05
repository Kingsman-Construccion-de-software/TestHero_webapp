namespace TestHero;

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
}