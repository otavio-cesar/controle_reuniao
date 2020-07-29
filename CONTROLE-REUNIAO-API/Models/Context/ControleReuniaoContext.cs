using Microsoft.EntityFrameworkCore;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Context
{
    public class ControleReuniaoContext : DbContext
    {
        public ControleReuniaoContext(DbContextOptions<ControleReuniaoContext> options)
                 : base(options)
        { }

        public DbSet<Evento> Evento { get; set; }
        public DbSet<Sala> Sala { get; set; }
    }
}
