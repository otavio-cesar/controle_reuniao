using Models.Entities;

namespace Utils
{
    public static class Formula
    {
        public static bool isEventosConflitantes(Evento ev1, Evento ev2)
        {
            int Dia = ev1.Dia.Day;
            int Mes = ev1.Dia.Month;
            int Ano = ev1.Dia.Year;

            // verifica se dias sao iguais
            if (ev2.Dia.Day == Dia && ev2.Dia.Month == Mes && ev2.Dia.Year == Ano)
            {
                // verifica se inicio ou termino de ev1 estao dentro do intervalo de ev2
                if ((ev1.Inicio >= ev2.Inicio && ev1.Inicio <= ev2.Termino) || (ev1.Termino >= ev2.Inicio && ev1.Termino <= ev2.Termino))
                {
                    return true;
                }

                // verifica se inicio ou termino de ev2 estao dentro do intervalo de ev1
                if ((ev2.Inicio >= ev1.Inicio && ev2.Inicio <= ev1.Termino) || (ev2.Termino >= ev1.Inicio && ev2.Termino <= ev1.Termino))
                {
                    return true;
                }
            }
            return false;
        }
    }
}
