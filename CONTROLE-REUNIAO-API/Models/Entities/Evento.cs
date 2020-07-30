using System;

namespace Models.Entities
{
    public class Evento
    {
        public int EventoId { get; set; }
        public string Responsavel { get; set; }
        public DateTime Dia { get; set; }
        public TimeSpan Inicio { get; set; }
        public TimeSpan Termino { get; set; }
        public int SalaId { get; set; }
        public Sala Sala { get; set; }
    }
}
