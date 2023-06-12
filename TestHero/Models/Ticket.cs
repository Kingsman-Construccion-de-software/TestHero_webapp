using System.Data;
using System.Data.Common;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MySqlConnector;

namespace TestHero
{


    /// <summary>
    /// Modelo para manejar los tickets de los alumnos
    /// </summary>
    public class Ticket
    {
        public int Tickets { get; set; }


        [JsonConstructor]
        public Ticket(int tickets)
        {
            this.Tickets = tickets;
        }


        internal AppDb Db { get; set; }

        internal Ticket(AppDb db) { Db = db; }

      
        /// <summary>
        /// Nos dice la cantidad de tickets de un alumno
        /// </summary>
        public async Task<Ticket> GetTickets(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"get_ticket";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idA", id);
            return await ReadAsync(await cmd.ExecuteReaderAsync());
        }

      
        /// <summary>
        /// Actualiza la cantidad de tickets
        /// </summary>
        public async Task UpdateTickets(int id)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"update_alumno_tickets";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@can", Tickets);
            cmd.Parameters.AddWithValue("@idA", id);

            await cmd.ExecuteNonQueryAsync();
        }
        
        /// <summary>
        /// Lectura de todos los atributos de tickets
        /// </summary>
        private async Task<Ticket> ReadAsync(MySqlDataReader reader)
        {
            var ticket = new Ticket(Db);

            using (reader)
            {

                await reader.ReadAsync();
                
                ticket.Tickets = reader.GetInt32(0);
            }
            return ticket;
        }


    }

}
