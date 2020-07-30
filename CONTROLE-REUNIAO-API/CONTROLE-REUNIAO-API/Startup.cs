using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Models.Context;

namespace CONTROLE_REUNIAO_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            // Pode ser utilizado MySql, SQLServer e Banco na Mem�ria. Por padr�o est� sendo configurado o banco na mem�ria. 
            // Caso queira mudar de banco, deixar descomentado o que for usar. Alterar tamb�m no appsetting.json.
            services.AddDbContext<ControleReuniaoContext>(options => options.UseSqlite(Configuration.GetConnectionString("MemoriaDBConn")));
            //services.AddDbContext<ControleReuniaoContext>(options => options.UseMySql(Configuration.GetConnectionString("MySqlConn")));
            //services.AddDbContext<ControleReuniaoContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SQLServerConn")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
