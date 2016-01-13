namespace Skyberry.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingcounters : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Counter",
                c => new
                    {
                        CounterId = c.Guid(nullable: false),
                        Name = c.String(nullable: false, maxLength: 50),
                        CurrentNumber = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CounterId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Counter");
        }
    }
}
