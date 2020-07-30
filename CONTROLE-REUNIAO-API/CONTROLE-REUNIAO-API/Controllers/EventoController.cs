using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Models.Context;
using Models.Entities;
using Newtonsoft.Json;
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

        // GET api/evento
        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return eventoServico.ObterTodosEager();
        }

        // GET api/evento/id
        [HttpGet("{id}")]
        public ActionResult<Evento> Get(int id)
        {
            var horaExtras = eventoServico.ObterPorId(id);

            Response.StatusCode = (int)HttpStatusCode.OK;
            return new JsonResult(horaExtras);
        }

        // POST api/evento
        [HttpPost]
        public void Post()
        {
            try
            {
                Evento horaExtra;
                using (var reader = new StreamReader(Request.Body))
                {
                    var body = reader.ReadToEndAsync();
                    horaExtra = JsonConvert.DeserializeObject<Evento>(body.Result);
                }

                eventoServico.Salvar(horaExtra);
            }
            catch (Exception)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }
        }

        // PUT api/evento/atualizar
        [HttpPost("Atualizar/")]
        public void Atualizar()
        {
            try
            {
                Evento evento;
                using (var reader = new StreamReader(Request.Body))
                {
                    var body = reader.ReadToEndAsync();
                    evento = JsonConvert.DeserializeObject<Evento>(body.Result);
                }

                eventoServico.Atualizar(evento);
            }
            catch (Exception)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }
        }

        // DELETE api/evento/id
        [HttpPost("Excluir/{id}")]
        public void Delete(int id)
        {
            try
            {
                eventoServico.Deletar(id);
            }
            catch (Exception)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }
        }
    }
}
