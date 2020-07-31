using System.Collections.Generic;

namespace Models.Entities
{
    public class Sala
    {
        public int SalaId { get; set; }
        public string Nome { get; set; }
        public List<Evento> Evento { get; set; }
    }
}
