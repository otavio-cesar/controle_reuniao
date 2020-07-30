using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Models.Context;
using Models.Entities;
using Servicos;

namespace CONTROLE_REUNIAO_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalaController : ControllerBase
    {
        private SalaServico salaServico;

        public SalaController(ControleReuniaoContext context)
        {
            salaServico = new SalaServico(context);
        }

        // Como não há crud de Salas, foi povoado algumas padrões no ControleReuniaoContext.cs.
        [HttpGet]
        public IEnumerable<Sala> Get()
        {
            return salaServico.ObterTodos().ToList();
        }
    }
}
