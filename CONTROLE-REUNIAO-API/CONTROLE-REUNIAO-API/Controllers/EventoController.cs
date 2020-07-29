using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Models.Context;
using Models.Entities;
using Servicos;

namespace CONTROLE_REUNIAO_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private EventoServico eventoServico;

        public EventoController(ControleReuniaoContext context)
        {
            eventoServico = new EventoServico(context);
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return eventoServico.ObterTodos();
        }
    }
}
