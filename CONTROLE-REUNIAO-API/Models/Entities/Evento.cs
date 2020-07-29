using System;

namespace Models.Entities
{
    public class Evento
    {
        public int EventoId { get; set; }
        public string Responsavel { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Termino { get; set; }
        public bool Finalizada
        {
            get
            {
                // se agora é maior que o termino da reunião, presume-se que está finalizada
                return DateTime.Now >= Termino;
            }
        }
        public int SalaId { get; set; }
        public Sala Sala { get; set; }
    }
}
