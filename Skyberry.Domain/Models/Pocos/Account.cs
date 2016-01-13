using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Account
    {
        public Account()
        {
            DateTime now = DateTime.Now;
            this.CreatedDate = now;
            this.ClientSinceDate = now;

            this.Addresses = new HashSet<Address>();
            this.Contacts = new HashSet<Contact>();
            this.Accolades = new HashSet<Accolade>();
            this.Invoices = new HashSet<Invoice>();
            this.Payments = new HashSet<Payment>();
            this.Projects = new HashSet<Project>();
            this.Testimonials = new HashSet<Testimonial>();
            this.SkyberryUsers = new HashSet<SkyberryUser>();
        }

        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Number { get; set; }
        [Display(Name="Industry Type")]
        public string IndustryType { get; set; }
        [Display(Name = "Client Since")]
        public System.DateTime ClientSinceDate { get; set; }
        [Display(Name = "Created")]
        public System.DateTime CreatedDate { get; set; }
        [Display(Name = "Active")]
        public bool IsActive { get; set; }

        public virtual ICollection<Accolade> Accolades { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Contact> Contacts { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<Testimonial> Testimonials { get; set; }
        public virtual ICollection<SkyberryUser> SkyberryUsers { get; set; }
    }

    public class AccountMap : EntityTypeConfiguration<Account>
    {
        public AccountMap()
        {
            // Table Mapping
            this.ToTable("Account");

            // Primary Key
            this.HasKey(e => e.Id);

            // Properties
            this.Property(e => e.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(255);

            this.Property(e => e.Number)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(e => e.IndustryType)
                .IsOptional()
                .HasMaxLength(100);


            // Column Mappings
            this.Property(e => e.Id).HasColumnName("AccountId");
            this.Property(e => e.Name).HasColumnName("Name");
            this.Property(e => e.Number).HasColumnName("Number");
            this.Property(e => e.IndustryType).HasColumnName("IndustryType");
            this.Property(e => e.ClientSinceDate).HasColumnName("ClientSinceDate");
            this.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
            this.Property(e => e.IsActive).HasColumnName("IsActive");


            // Relationships
            this.HasMany<Address>(e => e.Addresses)
                .WithMany(e => e.Accounts)
                .Map(e =>
                {
                    e.ToTable("AccountAddresses");
                    e.MapLeftKey("AccountId");
                    e.MapRightKey("AddressId");
                });

            this.HasMany<Contact>(e => e.Contacts)
                .WithMany(e => e.Accounts)
                .Map(e =>
                {
                    e.ToTable("AccountContacts");
                    e.MapLeftKey("AccountId");
                    e.MapRightKey("ContactId");
                });
        }
    }
}
