using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Testimonial
    {
        public Testimonial()
        {
            this.IsActive = true;
            this.ImageSets = new HashSet<ImageSet>();
        }

        public Guid TestimonialId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Display(Name="Featured")]
        public bool IsFeatured { get; set; }
        [Display(Name = "Active")]
        public bool IsActive { get; set; }

        [Display(Name = "Account")]
        public Guid? AccountId { get; set; }
        public virtual Account Account { get; set; }

        public virtual ICollection<ImageSet> ImageSets { get; set; }
    }

    public class TestimonialMap : EntityTypeConfiguration<Testimonial>
    {
        public TestimonialMap()
        {
            // Table Mapping
            this.ToTable("Testimonial");

            // Primary Key
            this.HasKey(e => e.TestimonialId);

            // Properties
            this.Property(e => e.TestimonialId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(e => e.Description)
                .IsOptional()
                .HasMaxLength(2000);


            // Column Mappings
            this.Property(e => e.TestimonialId).HasColumnName("TestimonialId");
            this.Property(e => e.Title).HasColumnName("Title");
            this.Property(e => e.Description).HasColumnName("Description");
            this.Property(e => e.IsFeatured).HasColumnName("IsFeatured");
            this.Property(e => e.IsActive).HasColumnName("IsActive");
            this.Property(e => e.AccountId).HasColumnName("AccountId");



            // Relationships

        }
    }
}
