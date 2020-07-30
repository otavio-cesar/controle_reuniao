using Model.Servicos;
using Models.Context;
using Models.Entities;

namespace Servicos
{
    public class SalaServico : ServicoBase<Sala>
    {
        public SalaServico(ControleReuniaoContext cx) : base(cx) { }
    }
}
