using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Server.Migrations
{
    public partial class init3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Thumbnail",
                table: "Product");

            migrationBuilder.AddColumn<string>(
                name: "Thumbnail",
                table: "ProductDetail",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Thumbnail",
                table: "ProductDetail");

            migrationBuilder.AddColumn<string>(
                name: "Thumbnail",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
