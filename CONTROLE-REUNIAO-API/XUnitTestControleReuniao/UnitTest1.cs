using Models.Entities;
using System;
using Utils;
using Xunit;

namespace XUnitTestControleReuniao
{
    public class UnitTest1
    {
        [Theory]
        [InlineData(01, 12, 2020, 14, 00, 14, 00, 01, 12, 2020, 14, 00, 14, 00, true)]
        [InlineData(02, 12, 2020, 14, 00, 14, 00, 01, 12, 2020, 14, 00, 14, 00, false)]
        public void Test1(int e1dia, int e1mes, int e1ano, int e1minIni, int e1horaIni, int e1minFim, int e1horaFim,
                          int e2dia, int e2mes, int e2ano, int e2minIni, int e2horaIni, int e2minFim, int e2horaFim, bool expected)
        {
            Evento e1 = new Evento
            {
                Dia = new DateTime(e1ano, e1mes, e1dia),
                Inicio = new TimeSpan(e1horaIni, e1minIni, 0),
                Termino = new TimeSpan(e1horaFim, e1minFim, 0)
            };

            Evento e2 = new Evento
            {
                Dia = new DateTime(e2ano, e2mes, e2dia),
                Inicio = new TimeSpan(e2horaIni, e2minIni, 0),
                Termino = new TimeSpan(e2horaFim, e2minFim, 0)
            };

            Assert.Equal(expected, Formula.isEventosConflitantes(e1, e2));
        }
    }
}
