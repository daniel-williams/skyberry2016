namespace Skyberry.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class imagesetimagetweaks : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Image", "ImageSetId", "dbo.ImageSet");
            DropIndex("dbo.Image", new[] { "ImageSetId" });
            AddColumn("dbo.Image", "Width", c => c.Int(nullable: false));
            AddColumn("dbo.Image", "Height", c => c.Int(nullable: false));
            AddColumn("dbo.ImageSet", "ImageId", c => c.Guid(nullable: false));
            CreateIndex("dbo.ImageSet", "ImageId");
            AddForeignKey("dbo.ImageSet", "ImageId", "dbo.Image", "DocumentId");
            DropColumn("dbo.Image", "ImageSetId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Image", "ImageSetId", c => c.Guid());
            DropForeignKey("dbo.ImageSet", "ImageId", "dbo.Image");
            DropIndex("dbo.ImageSet", new[] { "ImageId" });
            DropColumn("dbo.ImageSet", "ImageId");
            DropColumn("dbo.Image", "Height");
            DropColumn("dbo.Image", "Width");
            CreateIndex("dbo.Image", "ImageSetId");
            AddForeignKey("dbo.Image", "ImageSetId", "dbo.ImageSet", "ImageSetId");
        }
    }
}
