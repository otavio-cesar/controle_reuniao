using Model.Servicos;
using Models.Context;
using Models.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Servicos
{
    public class EventoServico : ServicoBase<Evento>
    {
        private SalaServico salaService;

        public EventoServico(ControleReuniaoContext cx) : base(cx)
        {
            salaService = new SalaServico(cx);
        }

        public IList<Evento> ObterTodosEager()
        {
            var eventos = base.ObterTodos().OrderByDescending(e => e.Dia).ToList();

            // adiciona entidade Sala ao evento
            eventos.ForEach(e => { completaDados(e); });

            return eventos;
        }

        private void completaDados(Evento evento)
        {
            evento.Sala = salaService.ObterPorId(evento.SalaId);
            evento.Sala.Evento = null;
        }

    }
}
