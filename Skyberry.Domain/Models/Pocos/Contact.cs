using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Contact
    {
        public Contact()
        {
            Accounts = new List<Account>();
            SkyberryUsers = new List<SkyberryUser>();
        }
        public Guid Id { get; set; }
        [Required]
        [Display(Name="Contact Data")]
        public string ContactData { get; set; }
        [Display(Name = "Contact Type")]
        public string ContactType { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
        public virtual ICollection<SkyberryUser> SkyberryUsers { get; set; }
    }

    public class ContactMap : EntityTypeConfiguration<Contact>
    {
        public ContactMap()
        {
            // Table Mapping
            this.ToTable("Contact");

            // Primary Key
            this.HasKey(e => e.Id);

            // Properties
            this.Property(e => e.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.ContactData)
                .IsRequired()
                .HasMaxLength(255);

            this.Property(e => e.ContactType)
                .IsOptional()
                .HasMaxLength(50);


            // Column Mappings
            this.Property(e => e.Id).HasColumnName("ContactId");


            // Relationships

        }
    }
}
