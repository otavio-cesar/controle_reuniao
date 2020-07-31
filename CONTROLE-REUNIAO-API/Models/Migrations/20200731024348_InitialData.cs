using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class InitialData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sala",
                columns: table => new
                {
                    SalaId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sala", x => x.SalaId);
                });

            migrationBuilder.CreateTable(
                name: "Evento",
                columns: table => new
                {
                    EventoId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Responsavel = table.Column<string>(nullable: true),
                    Dia = table.Column<DateTime>(nullable: false),
                    Inicio = table.Column<TimeSpan>(nullable: false),
                    Termino = table.Column<TimeSpan>(nullable: false),
                    SalaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evento", x => x.EventoId);
                    table.ForeignKey(
                        name: "FK_Evento_Sala_SalaId",
                        column: x => x.SalaId,
                        principalTable: "Sala",
                        principalColumn: "SalaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Sala",
                columns: new[] { "SalaId", "Nome" },
                values: new object[] { 1, "Sala executiva" });

            migrationBuilder.InsertData(
                table: "Sala",
                columns: new[] { "SalaId", "Nome" },
                values: new object[] { 2, "Sala gerencial" });

            migrationBuilder.InsertData(
                table: "Sala",
                columns: new[] { "SalaId", "Nome" },
                values: new object[] { 3, "Sala padrão" });

            migrationBuilder.CreateIndex(
                name: "IX_Evento_SalaId",
                table: "Evento",
                column: "SalaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Evento");

            migrationBuilder.DropTable(
                name: "Sala");
        }
    }
}
