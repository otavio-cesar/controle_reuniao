using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Models.Context;
using Models.Entities;
using Newtonsoft.Json;
using Servicos;
using Utils;

namespace CONTROLE_REUNIAO_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalaController : ControllerBase
    {
        private SalaServico salaServico;
        private EventoServico eventoServico;

        public SalaController(ControleReuniaoContext context)
        {
            salaServico = new SalaServico(context);
            eventoServico = new EventoServico(context);
        }

        // Como não há crud de Salas, foi povoado algumas padrões no ControleReuniaoContext.cs.
        [HttpGet]
        public IEnumerable<Sala> Get()
        {
            return salaServico.ObterTodos().ToList();
        }

        // Recebe um evento onde a disponibilidade de horário será verificada.
        [HttpPost("IsSalaDisponivel")]
        public ActionResult<dynamic> IsSalaDisponivel()
        {
            Evento evento;
            using (var reader = new StreamReader(Request.Body))
            {
                var body = reader.ReadToEndAsync();
                evento = JsonConvert.DeserializeObject<Evento>(body.Result);
            }

            var sala = salaServico.ObterPorId(evento.SalaId);

            // carrega eventos associados a sala
            sala.Evento = eventoServico.ObterTodos().Where(e => e.SalaId == sala.SalaId).ToList();

            // verifica se algum evento da sala não está disponível
            foreach (var e in sala.Evento)
            {
                //  se o evento buscado é igual ao passado por parametro, desconsidera.
                if (sala.Evento != null && evento.EventoId != e.EventoId)
                {
                    if (Formula.isEventosConflitantes(e, evento))
                    {
                        return new { disponivel = false };
                    }
                }
            };

            return new { disponivel = true };
        }

       
    }
}
