using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Address
    {
        public Address()
        {
            Accounts = new List<Account>();
            SkyberryUsers = new List<SkyberryUser>();
        }
        public Guid AddressId { get; set; }
        public string AddressType { get; set; }
        [Required]
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string Line3 { get; set; }
        public string Line4 { get; set; }
        public string Locality { get; set; }
        public string Region { get; set; }
        [Display(Name="Postal Code")]
        public string PostCode { get; set; }
        public string Country { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
        public virtual ICollection<SkyberryUser> SkyberryUsers { get; set; }
    }

    public class AddressMap : EntityTypeConfiguration<Address>
    {
        public AddressMap()
        {
            // Table Mapping
            this.ToTable("Address");

            // Primary Key
            this.HasKey(e => e.AddressId);

            // Properties
            this.Property(e => e.AddressId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.AddressType)
                .IsOptional()
                .HasMaxLength(50);

            this.Property(e => e.Line1)
                .IsOptional()
                .HasMaxLength(150);

            this.Property(e => e.Line2)
                .IsOptional()
                .HasMaxLength(150);

            this.Property(e => e.Line3)
                .IsOptional()
                .HasMaxLength(150);

            this.Property(e => e.Line4)
                .IsOptional()
                .HasMaxLength(150);

            this.Property(e => e.Locality)
                .IsOptional()
                .HasMaxLength(100);

            this.Property(e => e.Region)
                .IsOptional()
                .HasMaxLength(100);

            this.Property(e => e.PostCode)
                .IsOptional()
                .HasMaxLength(20);

            this.Property(e => e.Country)
                .IsOptional()
                .HasMaxLength(50);


            // Column Mappings
            this.Property(e => e.AddressId).HasColumnName("AddressId");
            this.Property(e => e.Line1).HasColumnName("Line1");
            this.Property(e => e.Line2).HasColumnName("Line2");
            this.Property(e => e.Line3).HasColumnName("Line3");
            this.Property(e => e.Line4).HasColumnName("Line4");
            this.Property(e => e.Locality).HasColumnName("Locality");
            this.Property(e => e.Region).HasColumnName("Region");
            this.Property(e => e.PostCode).HasColumnName("PostCode");
            this.Property(e => e.Country).HasColumnName("Country");
            this.Property(e => e.AddressType).HasColumnName("AddressType");

            // Relationships
        }
    }
}
