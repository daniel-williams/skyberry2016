namespace Skyberry.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class designreviewupdates : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ReviewComment",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 20, fixedLength: true),
                        Comment = c.String(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        OrderId = c.Guid(nullable: false),
                        UserId = c.Guid(nullable: false),
                        Username = c.String(maxLength: 100),
                        DesignReviewId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.DesignReview", t => t.DesignReviewId)
                .Index(t => t.DesignReviewId);
            
            AddColumn("dbo.ReviewDocument", "DocType", c => c.String(maxLength: 50));
            AddColumn("dbo.DesignReview", "CreatedDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.DesignReview", "RequestById", c => c.String(maxLength: 36));
            AddColumn("dbo.DesignReview", "RequestByName", c => c.String(maxLength: 100));
            AddColumn("dbo.DesignReview", "RequestByIp", c => c.String(maxLength: 45));
            AddColumn("dbo.DesignReview", "RequestType", c => c.Int(nullable: false));
            AddColumn("dbo.DesignReview", "RequestDate", c => c.DateTime());
            AddColumn("dbo.DesignReview", "ApprovedById", c => c.String(maxLength: 36));
            AddColumn("dbo.DesignReview", "ApprovedByName", c => c.String(maxLength: 100));
            AddColumn("dbo.DesignReview", "ApprovedByIp", c => c.String(maxLength: 45));
            AddColumn("dbo.DesignReview", "ApprovedDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ReviewComment", "DesignReviewId", "dbo.DesignReview");
            DropIndex("dbo.ReviewComment", new[] { "DesignReviewId" });
            DropColumn("dbo.DesignReview", "ApprovedDate");
            DropColumn("dbo.DesignReview", "ApprovedByIp");
            DropColumn("dbo.DesignReview", "ApprovedByName");
            DropColumn("dbo.DesignReview", "ApprovedById");
            DropColumn("dbo.DesignReview", "RequestDate");
            DropColumn("dbo.DesignReview", "RequestType");
            DropColumn("dbo.DesignReview", "RequestByIp");
            DropColumn("dbo.DesignReview", "RequestByName");
            DropColumn("dbo.DesignReview", "RequestById");
            DropColumn("dbo.DesignReview", "CreatedDate");
            DropColumn("dbo.ReviewDocument", "DocType");
            DropTable("dbo.ReviewComment");
        }
    }
}
