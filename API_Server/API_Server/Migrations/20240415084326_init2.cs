using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Server.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Discound",
                table: "Voucher",
                newName: "Discount");

            migrationBuilder.RenameColumn(
                name: "PercentDiscound",
                table: "ProductSale",
                newName: "PercentDiscount");

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "ProductType",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "ProductType");

            migrationBuilder.RenameColumn(
                name: "Discount",
                table: "Voucher",
                newName: "Discound");

            migrationBuilder.RenameColumn(
                name: "PercentDiscount",
                table: "ProductSale",
                newName: "PercentDiscound");
        }
    }
}
