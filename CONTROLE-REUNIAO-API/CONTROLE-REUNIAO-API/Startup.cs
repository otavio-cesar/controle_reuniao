using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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
            services.AddCors();
            services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
            
            // Pode ser utilizado MySql, SQLServer e Banco na Memória. Por padrão está sendo configurado o banco na memória. 
            // Caso queira mudar de banco, deixar descomentado o que for usar. Alterar também no appsetting.json.

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

            app.Use((context, next) =>
            {
                context.Response.Headers["Access-Control-Allow-Origin"] = "*";
                return next.Invoke();
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder => builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
