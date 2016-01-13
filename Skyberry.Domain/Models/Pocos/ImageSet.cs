using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class ImageSet
    {
        public ImageSet()
        {
            this.ImageSetItems = new HashSet<ImageSetItem>();
            this.Accolades = new HashSet<Accolade>();
            this.Testimonials = new HashSet<Testimonial>();
        }

        public Guid ImageSetId { get; set; }
        [Required]
        public string Name { get; set; }

        [Display(Name = "Thumbnail")]
        public Guid ImageId { get; set; }
        public virtual Image Image { get; set; }

        [Display(Name="Image Set Items")]
        public virtual ICollection<ImageSetItem> ImageSetItems { get; set; }
        public virtual ICollection<Accolade> Accolades { get; set; }
        public virtual ICollection<Testimonial> Testimonials { get; set; }

        [NotMapped]
        public List<Image> SetImages
        {
            get
            {
                List<Image> setImages = new List<Image>();
                foreach (var item in ImageSetItems)
                {
                    setImages.Add(item.Image);
                }

                return setImages;
            }
        }

    }

    public class ImageSetMap : EntityTypeConfiguration<ImageSet>
    {
        public ImageSetMap()
        {
            // Table Mapping
            this.ToTable("ImageSet");

            // Primary Key
            this.HasKey(e => e.ImageSetId);

            // Properties
            this.Property(e => e.ImageSetId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50);


            // Column Mappings
            this.Property(e => e.ImageSetId).HasColumnName("ImageSetId");
            this.Property(e => e.Name).HasColumnName("Name");



            // Relationships
            this.HasRequired<Image>(e => e.Image)
                .WithMany()
                .HasForeignKey(e => e.ImageId);

            this.HasMany<Accolade>(e => e.Accolades)
                .WithMany(e => e.ImageSets)
                .Map(e =>
                {
                    e.ToTable("ImageSetAccolades");
                    e.MapLeftKey("ImageSetId");
                    e.MapRightKey("AccoladeId");
                });

            this.HasMany<Testimonial>(e => e.Testimonials)
                .WithMany(e => e.ImageSets)
                .Map(e =>
                {
                    e.ToTable("ImageSetTestimonials");
                    e.MapLeftKey("ImageSetId");
                    e.MapRightKey("TestimonialId");
                });
        }
    }
}
