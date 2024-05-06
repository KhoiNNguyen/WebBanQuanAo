using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Server.Migrations
{
    public partial class Gender : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SDT",
                table: "Brand");

            migrationBuilder.AddColumn<int>(
                name: "GenderId",
                table: "ProductType",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Gender",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gender", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductType_GenderId",
                table: "ProductType",
                column: "GenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductType_Gender_GenderId",
                table: "ProductType",
                column: "GenderId",
                principalTable: "Gender",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductType_Gender_GenderId",
                table: "ProductType");

            migrationBuilder.DropTable(
                name: "Gender");

            migrationBuilder.DropIndex(
                name: "IX_ProductType_GenderId",
                table: "ProductType");

            migrationBuilder.DropColumn(
                name: "GenderId",
                table: "ProductType");

            migrationBuilder.AddColumn<string>(
                name: "SDT",
                table: "Brand",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
