using Microsoft.EntityFrameworkCore;
using Models.Entities;
using System.Collections.Generic;

namespace Models.Context
{
    public class ControleReuniaoContext : DbContext
    {
        public ControleReuniaoContext(DbContextOptions<ControleReuniaoContext> options)
                 : base(options)
        { }

        public DbSet<Evento> Evento { get; set; }
        public DbSet<Sala> Sala { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var salasIniciais = new List<Sala>(new[] {
                new Sala { SalaId = 1, Nome = "Sala executiva" },
                new Sala { SalaId = 2, Nome = "Sala gerencial" },
                new Sala { SalaId = 3, Nome = "Sala padrão" }
            });
            
            // Cria salas padrões no primeiro migration
            modelBuilder.Entity<Sala>().HasData(salasIniciais);
        }
    }

}
