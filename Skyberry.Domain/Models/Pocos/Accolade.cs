using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Accolade
    {
        public Accolade()
        {
            this.ImageSets = new HashSet<ImageSet>();
        }

        public Guid AccoladeId { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public Guid? AccountId { get; set; }
        public virtual Account Account { get; set; }
        
        public virtual ICollection<ImageSet> ImageSets { get; set; }
    }

    public class AccoladeMap : EntityTypeConfiguration<Accolade>
    {
        public AccoladeMap()
        {
            // Table Mapping
            this.ToTable("Accolade");

            // Primary Key
            this.HasKey(e => e.AccoladeId);

            // Properties
            this.Property(e => e.AccoladeId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(e => e.Description)
                .HasMaxLength(2000);


            // Column Mappings
            this.Property(e => e.AccoladeId).HasColumnName("AccoladeId");
            this.Property(e => e.Title).HasColumnName("Title");
            this.Property(e => e.Description).HasColumnName("Description");
            this.Property(e => e.IsActive).HasColumnName("IsActive");


            // Relationships
            this.HasOptional<Account>(e => e.Account)
                .WithMany(e => e.Accolades)
                .HasForeignKey(e => e.AccountId)
                .WillCascadeOnDelete(false);
        }
    }
}
