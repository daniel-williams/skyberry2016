namespace Skyberry.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class identity2 : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.AspNetUserLogins");
            AddColumn("dbo.SkyberryUser", "EmailConfirmed", c => c.Boolean(nullable: false));
            AddColumn("dbo.SkyberryUser", "PhoneNumber", c => c.String());
            AddColumn("dbo.SkyberryUser", "PhoneNumberConfirmed", c => c.Boolean(nullable: false));
            AddColumn("dbo.SkyberryUser", "TwoFactorEnabled", c => c.Boolean(nullable: false));
            AddColumn("dbo.SkyberryUser", "LockoutEndDateUtc", c => c.DateTime());
            AddColumn("dbo.SkyberryUser", "LockoutEnabled", c => c.Boolean(nullable: false));
            AddColumn("dbo.SkyberryUser", "AccessFailedCount", c => c.Int(nullable: false));
            AlterColumn("dbo.AspNetRoles", "Name", c => c.String(nullable: false, maxLength: 256));
            AddPrimaryKey("dbo.AspNetUserLogins", new[] { "LoginProvider", "ProviderKey", "UserId" });
            //CreateIndex("dbo.Accolade", "AccountId");
            //CreateIndex("dbo.AspNetUserClaims", "SkyberryUser_Id");
            //CreateIndex("dbo.AspNetUserLogins", "SkyberryUser_Id");
            //CreateIndex("dbo.AspNetUserRoles", "RoleId");
            //CreateIndex("dbo.AspNetUserRoles", "SkyberryUser_Id");
            //CreateIndex("dbo.Project", "AccountId");
            //CreateIndex("dbo.DesignReview", "ProjectId");
            //CreateIndex("dbo.DesignReview", "SelectedReviewDocumentId");
            //CreateIndex("dbo.Payment", "AccountId");
            //CreateIndex("dbo.Testimonial", "AccountId");
            //CreateIndex("dbo.ImageSet", "ImageId");
            //CreateIndex("dbo.ImageSetItem", "ImageId");
            //CreateIndex("dbo.ImageSetItem", "ImageSetId");
            //CreateIndex("dbo.AspNetRoles", "Name", unique: true, name: "RoleNameIndex");
            //CreateIndex("dbo.SkyberryUserAccounts", "SkyberryUserId");
            //CreateIndex("dbo.SkyberryUserAccounts", "AccountId");
            //CreateIndex("dbo.SkyberryUserAddresses", "SkyberryUserId");
            //CreateIndex("dbo.SkyberryUserAddresses", "AddressId");
            //CreateIndex("dbo.SkyberryUserContacts", "SkyberryUserId");
            //CreateIndex("dbo.SkyberryUserContacts", "ContactId");
            //CreateIndex("dbo.AccountAddresses", "AccountId");
            //CreateIndex("dbo.AccountAddresses", "AddressId");
            //CreateIndex("dbo.AccountContacts", "AccountId");
            //CreateIndex("dbo.AccountContacts", "ContactId");
            //CreateIndex("dbo.ProjectContracts", "ProjectId");
            //CreateIndex("dbo.ProjectContracts", "ContractId");
            //CreateIndex("dbo.ImageSetAccolades", "ImageSetId");
            //CreateIndex("dbo.ImageSetAccolades", "AccoladeId");
            //CreateIndex("dbo.ImageTags", "ImageId");
            //CreateIndex("dbo.ImageTags", "TagId");
            //CreateIndex("dbo.ImageSetTestimonials", "ImageSetId");
            //CreateIndex("dbo.ImageSetTestimonials", "TestimonialId");
            //CreateIndex("dbo.ContractDocument", "DocumentId");
            //CreateIndex("dbo.ContractDocument", "ContractId");
            //CreateIndex("dbo.Image", "DocumentId");
            //CreateIndex("dbo.Invoice", "DocumentId");
            //CreateIndex("dbo.Invoice", "AccountId");
            //CreateIndex("dbo.Invoice", "ProjectId");
            //CreateIndex("dbo.ProjectDocument", "DocumentId");
            //CreateIndex("dbo.ProjectDocument", "ProjectId");
            //CreateIndex("dbo.ReviewDocument", "DocumentId");
            //CreateIndex("dbo.ReviewDocument", "DesignReviewId");
            DropColumn("dbo.SkyberryUser", "IsConfirmed");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SkyberryUser", "IsConfirmed", c => c.Boolean(nullable: false));
            //DropIndex("dbo.ReviewDocument", new[] { "DesignReviewId" });
            //DropIndex("dbo.ReviewDocument", new[] { "DocumentId" });
            //DropIndex("dbo.ProjectDocument", new[] { "ProjectId" });
            //DropIndex("dbo.ProjectDocument", new[] { "DocumentId" });
            //DropIndex("dbo.Invoice", new[] { "ProjectId" });
            //DropIndex("dbo.Invoice", new[] { "AccountId" });
            //DropIndex("dbo.Invoice", new[] { "DocumentId" });
            //DropIndex("dbo.Image", new[] { "DocumentId" });
            //DropIndex("dbo.ContractDocument", new[] { "ContractId" });
            //DropIndex("dbo.ContractDocument", new[] { "DocumentId" });
            //DropIndex("dbo.ImageSetTestimonials", new[] { "TestimonialId" });
            //DropIndex("dbo.ImageSetTestimonials", new[] { "ImageSetId" });
            //DropIndex("dbo.ImageTags", new[] { "TagId" });
            //DropIndex("dbo.ImageTags", new[] { "ImageId" });
            //DropIndex("dbo.ImageSetAccolades", new[] { "AccoladeId" });
            //DropIndex("dbo.ImageSetAccolades", new[] { "ImageSetId" });
            //DropIndex("dbo.ProjectContracts", new[] { "ContractId" });
            //DropIndex("dbo.ProjectContracts", new[] { "ProjectId" });
            //DropIndex("dbo.AccountContacts", new[] { "ContactId" });
            //DropIndex("dbo.AccountContacts", new[] { "AccountId" });
            //DropIndex("dbo.AccountAddresses", new[] { "AddressId" });
            //DropIndex("dbo.AccountAddresses", new[] { "AccountId" });
            //DropIndex("dbo.SkyberryUserContacts", new[] { "ContactId" });
            //DropIndex("dbo.SkyberryUserContacts", new[] { "SkyberryUserId" });
            //DropIndex("dbo.SkyberryUserAddresses", new[] { "AddressId" });
            //DropIndex("dbo.SkyberryUserAddresses", new[] { "SkyberryUserId" });
            //DropIndex("dbo.SkyberryUserAccounts", new[] { "AccountId" });
            //DropIndex("dbo.SkyberryUserAccounts", new[] { "SkyberryUserId" });
            //DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            //DropIndex("dbo.ImageSetItem", new[] { "ImageSetId" });
            //DropIndex("dbo.ImageSetItem", new[] { "ImageId" });
            //DropIndex("dbo.ImageSet", new[] { "ImageId" });
            //DropIndex("dbo.Testimonial", new[] { "AccountId" });
            //DropIndex("dbo.Payment", new[] { "AccountId" });
            //DropIndex("dbo.DesignReview", new[] { "SelectedReviewDocumentId" });
            //DropIndex("dbo.DesignReview", new[] { "ProjectId" });
            //DropIndex("dbo.Project", new[] { "AccountId" });
            //DropIndex("dbo.AspNetUserRoles", new[] { "SkyberryUser_Id" });
            //DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            //DropIndex("dbo.AspNetUserLogins", new[] { "SkyberryUser_Id" });
            //DropIndex("dbo.AspNetUserClaims", new[] { "SkyberryUser_Id" });
            //DropIndex("dbo.Accolade", new[] { "AccountId" });
            DropPrimaryKey("dbo.AspNetUserLogins");
            AlterColumn("dbo.AspNetRoles", "Name", c => c.String(nullable: false));
            DropColumn("dbo.SkyberryUser", "AccessFailedCount");
            DropColumn("dbo.SkyberryUser", "LockoutEnabled");
            DropColumn("dbo.SkyberryUser", "LockoutEndDateUtc");
            DropColumn("dbo.SkyberryUser", "TwoFactorEnabled");
            DropColumn("dbo.SkyberryUser", "PhoneNumberConfirmed");
            DropColumn("dbo.SkyberryUser", "PhoneNumber");
            DropColumn("dbo.SkyberryUser", "EmailConfirmed");
            AddPrimaryKey("dbo.AspNetUserLogins", new[] { "UserId", "LoginProvider", "ProviderKey" });
        }
    }
}
