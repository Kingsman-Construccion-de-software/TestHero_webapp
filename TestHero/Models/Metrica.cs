using MySqlConnector;
using System.Data;
using System.Text.Json.Serialization;

namespace TestHero
{
    /// <summary>
    /// Modelo para los requests de métricas
    /// </summary>

    public class Metrica
    {
        public double Valor { get; set; }
        public string Label { get; set; }

        [JsonConstructor]
        public Metrica(int Valor, string label)
        {
            this.Valor = Valor;
            this.Label = label;
        }

        internal AppDb Db { get; set; }

        internal Metrica(AppDb db) { Db = db; }

        /// <summary>
        /// Metodo para obtener el promedio de un examen
        /// </summary>
        public async Task<Metrica> GetExamenPromedio(int idE)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_promedio";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idE", idE);
            return await ReadNumAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Metodo para obtener la desviación estándar de un examen
        /// </summary>
        public async Task<Metrica> GetExamenDesvest(int idE)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_desv_est";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idE", idE);
            return await ReadNumAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Metodo para obtener la tasa de aprobamiento de un examen
        /// </summary>
        public async Task<Metrica> GetTasaAprob(int idE)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_tasa_aprob";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idE", idE);
            return await ReadNumAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Metodo para obtener la pregunta más difícil y cuántos alumnos la sacaron correcta
        /// </summary>
        public async Task<Metrica> GetPregMasDificil(int idE)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_pregunta_mas_dificil";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idE", idE);
            return await ReadTextAsync(await cmd.ExecuteReaderAsync());
        }

        /// <summary>
        /// Funcion dedicada a leer una métrica numérica
        /// </summary>
        private async Task<Metrica> ReadNumAsync(MySqlDataReader reader)
        {
            var respuesta = new Metrica(Db);

            using (reader)
            {
                await reader.ReadAsync();
                respuesta = new Metrica(Db)
                {
                    Valor = reader.GetDouble(0)
                };

            }

            return respuesta;
        }

        /// <summary>
        /// Funcion dedicada a leer varias métricas numéricas
        /// </summary>
        private async Task<List<Metrica>> ReadAllNumAsync(MySqlDataReader reader)
        {
            var respuestas = new List<Metrica>();
            

            using (reader)
            {
                while(await reader.ReadAsync())
                {
                    var respuesta = new Metrica(Db)
                    {
                        Valor = reader.GetDouble(0)
                    };

                    respuestas.Add(respuesta);

                }

            }

            return respuestas;
        }

        /// <summary>
        /// Funcion dedicada a leer una metrica en formato de texto
        /// </summary>
        private async Task<Metrica> ReadTextAsync(MySqlDataReader reader)
        {
            var respuesta = new Metrica(Db);

            using (reader)
            {
                await reader.ReadAsync();
                respuesta = new Metrica(Db)
                {
                    Label = reader.GetString(0),
                    Valor = reader.GetInt32(1)
                };
            }

            return respuesta;

        }

    }
}
