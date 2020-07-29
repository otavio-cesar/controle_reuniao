using Model.Servicos;
using Models.Context;
using Models.Entities;

namespace Servicos
{
    public class SalaServico : ServicoBase<Sala>
    {
        public SalaServico(ControleReuniaoContext cx) : base(cx) { }

        //public virtual Evento BuscaPorNome(string Nome)
        //{
        //    var sistemas = base.ObterTodos().Where(x => x.Nome == Nome).ToList();

        //    Evento sistema = sistemas[0];

        //    return sistema;
        //}

        //public IList<Evento> obterTodosEager()
        //{
        //    var sistema = ObterTodos();
        //    completaDados(Evento);
        //    return Evento;
        //}      

        //private void completaDados(IList<Evento> sistemas)
        //{
        //    foreach (var s in sistemas)
        //    {
        //        s.SistemaClientes = sistemaClienteServico.ObterPorSistema(s.SistemaId).ToList();
        //    }
        //}

    }
}
