using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Skyberry.Domain
{
    public partial class SkyberryUser : IdentityUser
    {
        public SkyberryUser()
        {
            this.Addresses = new HashSet<Address>();
            this.Contacts = new HashSet<Contact>();
            this.Accounts = new HashSet<Account>();
            this.CreatedDate = DateTime.UtcNow;
        }

        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JobTitle { get; set; }
        public DateTime CreatedDate { get; set; }

        public string OldPassword { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Contact> Contacts { get; set; }
        public virtual ICollection<Account> Accounts { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<SkyberryUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }

        [NotMapped]
        public string FullName
        {
            get
            {
                return (FirstName + " " + LastName).Trim();
            }
        }
    }

    public class SkyberryUserMap : EntityTypeConfiguration<SkyberryUser>
    {
        public SkyberryUserMap()
        {
            // Table Mapping

            // Primary Key

            // Properties
            this.Property(e => e.UserName)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(e => e.Email)
                .IsOptional()
                .HasMaxLength(255);

            this.Property(e => e.Title)
                .IsOptional()
                .HasMaxLength(30);

            this.Property(e => e.FirstName)
                .IsOptional()
                .HasMaxLength(30);

            this.Property(e => e.LastName)
                .IsOptional()
                .HasMaxLength(30);

            this.Property(e => e.JobTitle)
                .IsOptional()
                .HasMaxLength(100);

            this.Property(e => e.OldPassword)
                .IsOptional()
                .HasMaxLength(100);

            this.Property(e => e.PasswordHash)
                .IsOptional()
                .HasMaxLength(128);

            this.Property(e => e.SecurityStamp)
                .IsOptional()
                .HasMaxLength(128);


            // Column Mappings
            this.Property(e => e.Title).HasColumnName("Title");
            this.Property(e => e.FirstName).HasColumnName("FirstName");
            this.Property(e => e.LastName).HasColumnName("LastName");
            this.Property(e => e.JobTitle).HasColumnName("JobTitle");
            this.Property(e => e.CreatedDate).HasColumnName("CreatedDate");



            // Relationships
            this.HasMany<Account>(e => e.Accounts)
                .WithMany(e => e.SkyberryUsers)
                .Map(e =>
                {
                    e.ToTable("SkyberryUserAccounts");
                    e.MapLeftKey("SkyberryUserId");
                    e.MapRightKey("AccountId");
                });

            this.HasMany<Address>(e => e.Addresses)
                .WithMany(e => e.SkyberryUsers)
                .Map(e =>
                {
                    e.ToTable("SkyberryUserAddresses");
                    e.MapLeftKey("SkyberryUserId");
                    e.MapRightKey("AddressId");
                });

            this.HasMany<Contact>(e => e.Contacts)
                .WithMany(e => e.SkyberryUsers)
                .Map(e =>
                {
                    e.ToTable("SkyberryUserContacts");
                    e.MapLeftKey("SkyberryUserId");
                    e.MapRightKey("ContactId");
                });
        }
    }
}
