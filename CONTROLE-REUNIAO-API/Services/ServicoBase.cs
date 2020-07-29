using Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Model.Servicos
{
    public class ServicoBase<T> where T : class
    {
        public ControleReuniaoContext reuniaoContext;

        public ServicoBase(ControleReuniaoContext cx)
        {
            reuniaoContext = cx;
        }

        public virtual IList<T> ObterTodos()
        {
            return reuniaoContext.Set<T>().ToList();
        }

        public virtual T BuscaPorId(int id)
        {
            return reuniaoContext.Set<T>().Find(id);
        }

        public virtual void Salvar(T entity)
        {
            try
            {
                reuniaoContext.Set<T>().Add(entity);
                reuniaoContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public virtual void Atualizar(T entity)
        {
            try
            {
                reuniaoContext.Set<T>().Update(entity);
                reuniaoContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public virtual void Deletar(int id)
        {
            try
            {
                reuniaoContext.Set<T>().Remove(BuscaPorId(id));
                reuniaoContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
