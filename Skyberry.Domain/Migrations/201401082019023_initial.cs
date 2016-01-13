namespace Skyberry.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Accolade",
                c => new
                    {
                        AccoladeId = c.Guid(nullable: false),
                        Title = c.String(nullable: false, maxLength: 50),
                        Description = c.String(maxLength: 2000),
                        IsActive = c.Boolean(nullable: false),
                        AccountId = c.Guid(),
                    })
                .PrimaryKey(t => t.AccoladeId)
                .ForeignKey("dbo.Account", t => t.AccountId)
                .Index(t => t.AccountId);
            
            CreateTable(
                "dbo.Account",
                c => new
                    {
                        AccountId = c.Guid(nullable: false),
                        Name = c.String(nullable: false, maxLength: 255),
                        Number = c.String(nullable: false, maxLength: 10),
                        IndustryType = c.String(maxLength: 100),
                        ClientSinceDate = c.DateTime(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.AccountId);
            
            CreateTable(
                "dbo.Address",
                c => new
                    {
                        AddressId = c.Guid(nullable: false),
                        AddressType = c.String(maxLength: 50),
                        Line1 = c.String(maxLength: 150),
                        Line2 = c.String(maxLength: 150),
                        Line3 = c.String(maxLength: 150),
                        Line4 = c.String(maxLength: 150),
                        Locality = c.String(maxLength: 100),
                        Region = c.String(maxLength: 100),
                        PostCode = c.String(maxLength: 20),
                        Country = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.AddressId);
            
            CreateTable(
                "dbo.SkyberryUser",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Title = c.String(maxLength: 30),
                        FirstName = c.String(maxLength: 30),
                        LastName = c.String(maxLength: 30),
                        JobTitle = c.String(maxLength: 100),
                        CreatedDate = c.DateTime(nullable: false),
                        OldPassword = c.String(maxLength: 100),
                        UserName = c.String(nullable: false, maxLength: 100),
                        Email = c.String(maxLength: 255),
                        PasswordHash = c.String(maxLength: 128),
                        SecurityStamp = c.String(maxLength: 128),
                        IsConfirmed = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                        SkyberryUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.SkyberryUser", t => t.SkyberryUser_Id)
                .Index(t => t.SkyberryUser_Id);
            
            CreateTable(
                "dbo.Contact",
                c => new
                    {
                        ContactId = c.Guid(nullable: false),
                        ContactData = c.String(nullable: false, maxLength: 255),
                        ContactType = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.ContactId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        SkyberryUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.LoginProvider, t.ProviderKey })
                .ForeignKey("dbo.SkyberryUser", t => t.SkyberryUser_Id)
                .Index(t => t.SkyberryUser_Id);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                        SkyberryUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.SkyberryUser", t => t.SkyberryUser_Id)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.SkyberryUser_Id)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Document",
                c => new
                    {
                        DocumentId = c.Guid(nullable: false),
                        Filename = c.String(nullable: false, maxLength: 255),
                        FilenameOriginal = c.String(maxLength: 255),
                        FileData = c.Binary(),
                        FilePath = c.String(nullable: false, maxLength: 255),
                        FileExt = c.String(maxLength: 25),
                        FileMimeType = c.String(nullable: false, maxLength: 100),
                        FileSize = c.Int(nullable: false),
                        Title = c.String(maxLength: 100),
                        Description = c.String(maxLength: 2000),
                        Version = c.String(maxLength: 20),
                        CreatedDate = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.DocumentId);
            
            CreateTable(
                "dbo.Project",
                c => new
                    {
                        ProjectId = c.Guid(nullable: false),
                        Name = c.String(nullable: false, maxLength: 200),
                        Description = c.String(maxLength: 2000),
                        Status = c.String(maxLength: 100),
                        StartDate = c.DateTime(),
                        EstimatedCompletionDate = c.DateTime(),
                        CompletionDate = c.DateTime(),
                        CreatedDate = c.DateTime(nullable: false),
                        AccountId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectId)
                .ForeignKey("dbo.Account", t => t.AccountId)
                .Index(t => t.AccountId);
            
            CreateTable(
                "dbo.Contract",
                c => new
                    {
                        ContractId = c.Guid(nullable: false),
                        Title = c.String(maxLength: 100),
                        Number = c.String(nullable: false, maxLength: 10),
                        CreatedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ContractId);
            
            CreateTable(
                "dbo.DesignReview",
                c => new
                    {
                        DesignReviewId = c.Guid(nullable: false),
                        Title = c.String(nullable: false, maxLength: 100),
                        Description = c.String(maxLength: 2000),
                        SelectedComment = c.String(maxLength: 2000),
                        AdditionalComment = c.String(maxLength: 2000),
                        AcceptedDate = c.DateTime(),
                        IsActive = c.Boolean(nullable: false),
                        ProjectId = c.Guid(nullable: false),
                        SelectedReviewDocumentId = c.Guid(),
                    })
                .PrimaryKey(t => t.DesignReviewId)
                .ForeignKey("dbo.Project", t => t.ProjectId)
                .ForeignKey("dbo.ReviewDocument", t => t.SelectedReviewDocumentId)
                .Index(t => t.ProjectId)
                .Index(t => t.SelectedReviewDocumentId);
            
            CreateTable(
                "dbo.Payment",
                c => new
                    {
                        PaymentId = c.Guid(nullable: false),
                        Amount = c.Decimal(precision: 18, scale: 2),
                        PaymentType = c.String(maxLength: 50),
                        PaymentDate = c.DateTime(),
                        CreatedDate = c.DateTime(nullable: false),
                        AccountId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.PaymentId)
                .ForeignKey("dbo.Account", t => t.AccountId)
                .Index(t => t.AccountId);
            
            CreateTable(
                "dbo.Testimonial",
                c => new
                    {
                        TestimonialId = c.Guid(nullable: false),
                        Title = c.String(nullable: false, maxLength: 100),
                        Description = c.String(maxLength: 2000),
                        IsFeatured = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        AccountId = c.Guid(),
                    })
                .PrimaryKey(t => t.TestimonialId)
                .ForeignKey("dbo.Account", t => t.AccountId)
                .Index(t => t.AccountId);
            
            CreateTable(
                "dbo.ImageSet",
                c => new
                    {
                        ImageSetId = c.Guid(nullable: false),
                        Name = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.ImageSetId);
            
            CreateTable(
                "dbo.ImageSetItem",
                c => new
                    {
                        ImageSetItemId = c.Guid(nullable: false),
                        Position = c.Byte(nullable: false),
                        ImageId = c.Guid(nullable: false),
                        ImageSetId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.ImageSetItemId)
                .ForeignKey("dbo.Image", t => t.ImageId)
                .ForeignKey("dbo.ImageSet", t => t.ImageSetId)
                .Index(t => t.ImageId)
                .Index(t => t.ImageSetId);
            
            CreateTable(
                "dbo.Tag",
                c => new
                    {
                        TagId = c.Guid(nullable: false),
                        Name = c.String(nullable: false, maxLength: 100),
                        IsFilter = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.TagId);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SkyberryUserAccounts",
                c => new
                    {
                        SkyberryUserId = c.String(nullable: false, maxLength: 128),
                        AccountId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.SkyberryUserId, t.AccountId })
                .ForeignKey("dbo.SkyberryUser", t => t.SkyberryUserId, cascadeDelete: true)
                .ForeignKey("dbo.Account", t => t.AccountId, cascadeDelete: true)
                .Index(t => t.SkyberryUserId)
                .Index(t => t.AccountId);
            
            CreateTable(
                "dbo.SkyberryUserAddresses",
                c => new
                    {
                        SkyberryUserId = c.String(nullable: false, maxLength: 128),
                        AddressId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.SkyberryUserId, t.AddressId })
                .ForeignKey("dbo.SkyberryUser", t => t.SkyberryUserId, cascadeDelete: true)
                .ForeignKey("dbo.Address", t => t.AddressId, cascadeDelete: true)
                .Index(t => t.SkyberryUserId)
                .Index(t => t.AddressId);
            
            CreateTable(
                "dbo.SkyberryUserContacts",
                c => new
                    {
                        SkyberryUserId = c.String(nullable: false, maxLength: 128),
                        ContactId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.SkyberryUserId, t.ContactId })
                .ForeignKey("dbo.SkyberryUser", t => t.SkyberryUserId, cascadeDelete: true)
                .ForeignKey("dbo.Contact", t => t.ContactId, cascadeDelete: true)
                .Index(t => t.SkyberryUserId)
                .Index(t => t.ContactId);
            
            CreateTable(
                "dbo.AccountAddresses",
                c => new
                    {
                        AccountId = c.Guid(nullable: false),
                        AddressId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.AccountId, t.AddressId })
                .ForeignKey("dbo.Account", t => t.AccountId, cascadeDelete: true)
                .ForeignKey("dbo.Address", t => t.AddressId, cascadeDelete: true)
                .Index(t => t.AccountId)
                .Index(t => t.AddressId);
            
            CreateTable(
                "dbo.AccountContacts",
                c => new
                    {
                        AccountId = c.Guid(nullable: false),
                        ContactId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.AccountId, t.ContactId })
                .ForeignKey("dbo.Account", t => t.AccountId, cascadeDelete: true)
                .ForeignKey("dbo.Contact", t => t.ContactId, cascadeDelete: true)
                .Index(t => t.AccountId)
                .Index(t => t.ContactId);
            
            CreateTable(
                "dbo.ProjectContracts",
                c => new
                    {
                        ProjectId = c.Guid(nullable: false),
                        ContractId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.ProjectId, t.ContractId })
                .ForeignKey("dbo.Project", t => t.ProjectId, cascadeDelete: true)
                .ForeignKey("dbo.Contract", t => t.ContractId, cascadeDelete: true)
                .Index(t => t.ProjectId)
                .Index(t => t.ContractId);
            
            CreateTable(
                "dbo.ImageSetAccolades",
                c => new
                    {
                        ImageSetId = c.Guid(nullable: false),
                        AccoladeId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.ImageSetId, t.AccoladeId })
                .ForeignKey("dbo.ImageSet", t => t.ImageSetId, cascadeDelete: true)
                .ForeignKey("dbo.Accolade", t => t.AccoladeId, cascadeDelete: true)
                .Index(t => t.ImageSetId)
                .Index(t => t.AccoladeId);
            
            CreateTable(
                "dbo.ImageTags",
                c => new
                    {
                        ImageId = c.Guid(nullable: false),
                        TagId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.ImageId, t.TagId })
                .ForeignKey("dbo.Image", t => t.ImageId, cascadeDelete: true)
                .ForeignKey("dbo.Tag", t => t.TagId, cascadeDelete: true)
                .Index(t => t.ImageId)
                .Index(t => t.TagId);
            
            CreateTable(
                "dbo.ImageSetTestimonials",
                c => new
                    {
                        ImageSetId = c.Guid(nullable: false),
                        TestimonialId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.ImageSetId, t.TestimonialId })
                .ForeignKey("dbo.ImageSet", t => t.ImageSetId, cascadeDelete: true)
                .ForeignKey("dbo.Testimonial", t => t.TestimonialId, cascadeDelete: true)
                .Index(t => t.ImageSetId)
                .Index(t => t.TestimonialId);
            
            CreateTable(
                "dbo.ContractDocument",
                c => new
                    {
                        DocumentId = c.Guid(nullable: false),
                        DocType = c.String(maxLength: 50),
                        ContractId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.DocumentId)
                .ForeignKey("dbo.Document", t => t.DocumentId)
                .ForeignKey("dbo.Contract", t => t.ContractId)
                .Index(t => t.DocumentId)
                .Index(t => t.ContractId);
            
            CreateTable(
                "dbo.Image",
                c => new
                    {
                        DocumentId = c.Guid(nullable: false),
                        ImageSetId = c.Guid(),
                    })
                .PrimaryKey(t => t.DocumentId)
                .ForeignKey("dbo.Document", t => t.DocumentId)
                .ForeignKey("dbo.ImageSet", t => t.ImageSetId)
                .Index(t => t.DocumentId)
                .Index(t => t.ImageSetId);
            
            CreateTable(
                "dbo.Invoice",
                c => new
                    {
                        DocumentId = c.Guid(nullable: false),
                        InvoiceNumber = c.String(nullable: false, maxLength: 10),
                        Amount = c.Decimal(precision: 18, scale: 2),
                        SentDate = c.DateTime(),
                        DueDate = c.DateTime(),
                        IsEstimate = c.Boolean(nullable: false),
                        AccountId = c.Guid(nullable: false),
                        ProjectId = c.Guid(),
                    })
                .PrimaryKey(t => t.DocumentId)
                .ForeignKey("dbo.Document", t => t.DocumentId)
                .ForeignKey("dbo.Account", t => t.AccountId)
                .ForeignKey("dbo.Project", t => t.ProjectId)
                .Index(t => t.DocumentId)
                .Index(t => t.AccountId)
                .Index(t => t.ProjectId);
            
            CreateTable(
                "dbo.ProjectDocument",
                c => new
                    {
                        DocumentId = c.Guid(nullable: false),
                        DocType = c.String(maxLength: 50),
                        ProjectId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.DocumentId)
                .ForeignKey("dbo.Document", t => t.DocumentId)
                .ForeignKey("dbo.Project", t => t.ProjectId)
                .Index(t => t.DocumentId)
                .Index(t => t.ProjectId);
            
            CreateTable(
                "dbo.ReviewDocument",
                c => new
                    {
                        DocumentId = c.Guid(nullable: false),
                        Order = c.Byte(nullable: false),
                        DesignReviewId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.DocumentId)
                .ForeignKey("dbo.Document", t => t.DocumentId)
                .ForeignKey("dbo.DesignReview", t => t.DesignReviewId)
                .Index(t => t.DocumentId)
                .Index(t => t.DesignReviewId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ReviewDocument", "DesignReviewId", "dbo.DesignReview");
            DropForeignKey("dbo.ReviewDocument", "DocumentId", "dbo.Document");
            DropForeignKey("dbo.ProjectDocument", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.ProjectDocument", "DocumentId", "dbo.Document");
            DropForeignKey("dbo.Invoice", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.Invoice", "AccountId", "dbo.Account");
            DropForeignKey("dbo.Invoice", "DocumentId", "dbo.Document");
            DropForeignKey("dbo.Image", "ImageSetId", "dbo.ImageSet");
            DropForeignKey("dbo.Image", "DocumentId", "dbo.Document");
            DropForeignKey("dbo.ContractDocument", "ContractId", "dbo.Contract");
            DropForeignKey("dbo.ContractDocument", "DocumentId", "dbo.Document");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Accolade", "AccountId", "dbo.Account");
            DropForeignKey("dbo.ImageSetTestimonials", "TestimonialId", "dbo.Testimonial");
            DropForeignKey("dbo.ImageSetTestimonials", "ImageSetId", "dbo.ImageSet");
            DropForeignKey("dbo.ImageTags", "TagId", "dbo.Tag");
            DropForeignKey("dbo.ImageTags", "ImageId", "dbo.Image");
            DropForeignKey("dbo.ImageSetItem", "ImageSetId", "dbo.ImageSet");
            DropForeignKey("dbo.ImageSetItem", "ImageId", "dbo.Image");
            DropForeignKey("dbo.ImageSetAccolades", "AccoladeId", "dbo.Accolade");
            DropForeignKey("dbo.ImageSetAccolades", "ImageSetId", "dbo.ImageSet");
            DropForeignKey("dbo.Testimonial", "AccountId", "dbo.Account");
            DropForeignKey("dbo.Payment", "AccountId", "dbo.Account");
            DropForeignKey("dbo.DesignReview", "SelectedReviewDocumentId", "dbo.ReviewDocument");
            DropForeignKey("dbo.DesignReview", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.ProjectContracts", "ContractId", "dbo.Contract");
            DropForeignKey("dbo.ProjectContracts", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.Project", "AccountId", "dbo.Account");
            DropForeignKey("dbo.AccountContacts", "ContactId", "dbo.Contact");
            DropForeignKey("dbo.AccountContacts", "AccountId", "dbo.Account");
            DropForeignKey("dbo.AccountAddresses", "AddressId", "dbo.Address");
            DropForeignKey("dbo.AccountAddresses", "AccountId", "dbo.Account");
            DropForeignKey("dbo.AspNetUserRoles", "SkyberryUser_Id", "dbo.SkyberryUser");
            DropForeignKey("dbo.AspNetUserLogins", "SkyberryUser_Id", "dbo.SkyberryUser");
            DropForeignKey("dbo.SkyberryUserContacts", "ContactId", "dbo.Contact");
            DropForeignKey("dbo.SkyberryUserContacts", "SkyberryUserId", "dbo.SkyberryUser");
            DropForeignKey("dbo.AspNetUserClaims", "SkyberryUser_Id", "dbo.SkyberryUser");
            DropForeignKey("dbo.SkyberryUserAddresses", "AddressId", "dbo.Address");
            DropForeignKey("dbo.SkyberryUserAddresses", "SkyberryUserId", "dbo.SkyberryUser");
            DropForeignKey("dbo.SkyberryUserAccounts", "AccountId", "dbo.Account");
            DropForeignKey("dbo.SkyberryUserAccounts", "SkyberryUserId", "dbo.SkyberryUser");
            DropIndex("dbo.ReviewDocument", new[] { "DesignReviewId" });
            DropIndex("dbo.ReviewDocument", new[] { "DocumentId" });
            DropIndex("dbo.ProjectDocument", new[] { "ProjectId" });
            DropIndex("dbo.ProjectDocument", new[] { "DocumentId" });
            DropIndex("dbo.Invoice", new[] { "ProjectId" });
            DropIndex("dbo.Invoice", new[] { "AccountId" });
            DropIndex("dbo.Invoice", new[] { "DocumentId" });
            DropIndex("dbo.Image", new[] { "ImageSetId" });
            DropIndex("dbo.Image", new[] { "DocumentId" });
            DropIndex("dbo.ContractDocument", new[] { "ContractId" });
            DropIndex("dbo.ContractDocument", new[] { "DocumentId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.Accolade", new[] { "AccountId" });
            DropIndex("dbo.ImageSetTestimonials", new[] { "TestimonialId" });
            DropIndex("dbo.ImageSetTestimonials", new[] { "ImageSetId" });
            DropIndex("dbo.ImageTags", new[] { "TagId" });
            DropIndex("dbo.ImageTags", new[] { "ImageId" });
            DropIndex("dbo.ImageSetItem", new[] { "ImageSetId" });
            DropIndex("dbo.ImageSetItem", new[] { "ImageId" });
            DropIndex("dbo.ImageSetAccolades", new[] { "AccoladeId" });
            DropIndex("dbo.ImageSetAccolades", new[] { "ImageSetId" });
            DropIndex("dbo.Testimonial", new[] { "AccountId" });
            DropIndex("dbo.Payment", new[] { "AccountId" });
            DropIndex("dbo.DesignReview", new[] { "SelectedReviewDocumentId" });
            DropIndex("dbo.DesignReview", new[] { "ProjectId" });
            DropIndex("dbo.ProjectContracts", new[] { "ContractId" });
            DropIndex("dbo.ProjectContracts", new[] { "ProjectId" });
            DropIndex("dbo.Project", new[] { "AccountId" });
            DropIndex("dbo.AccountContacts", new[] { "ContactId" });
            DropIndex("dbo.AccountContacts", new[] { "AccountId" });
            DropIndex("dbo.AccountAddresses", new[] { "AddressId" });
            DropIndex("dbo.AccountAddresses", new[] { "AccountId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "SkyberryUser_Id" });
            DropIndex("dbo.AspNetUserLogins", new[] { "SkyberryUser_Id" });
            DropIndex("dbo.SkyberryUserContacts", new[] { "ContactId" });
            DropIndex("dbo.SkyberryUserContacts", new[] { "SkyberryUserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "SkyberryUser_Id" });
            DropIndex("dbo.SkyberryUserAddresses", new[] { "AddressId" });
            DropIndex("dbo.SkyberryUserAddresses", new[] { "SkyberryUserId" });
            DropIndex("dbo.SkyberryUserAccounts", new[] { "AccountId" });
            DropIndex("dbo.SkyberryUserAccounts", new[] { "SkyberryUserId" });
            DropTable("dbo.ReviewDocument");
            DropTable("dbo.ProjectDocument");
            DropTable("dbo.Invoice");
            DropTable("dbo.Image");
            DropTable("dbo.ContractDocument");
            DropTable("dbo.ImageSetTestimonials");
            DropTable("dbo.ImageTags");
            DropTable("dbo.ImageSetAccolades");
            DropTable("dbo.ProjectContracts");
            DropTable("dbo.AccountContacts");
            DropTable("dbo.AccountAddresses");
            DropTable("dbo.SkyberryUserContacts");
            DropTable("dbo.SkyberryUserAddresses");
            DropTable("dbo.SkyberryUserAccounts");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.Tag");
            DropTable("dbo.ImageSetItem");
            DropTable("dbo.ImageSet");
            DropTable("dbo.Testimonial");
            DropTable("dbo.Payment");
            DropTable("dbo.DesignReview");
            DropTable("dbo.Contract");
            DropTable("dbo.Project");
            DropTable("dbo.Document");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.Contact");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.SkyberryUser");
            DropTable("dbo.Address");
            DropTable("dbo.Account");
            DropTable("dbo.Accolade");
        }
    }
}
