using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Image : Document
    {
        public Image()
        {
            this.ImageSetItems = new HashSet<ImageSetItem>();
            this.Tags = new HashSet<Tag>();
            this.IsActive = true;
        }

        public int Width { get; set; }
        public int Height { get; set; }

        //public Guid? ImageSetId { get; set; }
        //public virtual ImageSet ImageSet { get; set; }

        public virtual ICollection<ImageSetItem> ImageSetItems { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }
    }

    public class ImageMap : EntityTypeConfiguration<Image>
    {
        public ImageMap()
        {
            // Table Mapping
            this.ToTable("Image");

            // Primary Key

            // Properties

            // Column Mappings
            this.Property(e => e.Width).HasColumnName("Width");
            this.Property(e => e.Height).HasColumnName("Height");



            // Relationships
            this.HasMany<Tag>(e => e.Tags)
                .WithMany(e => e.Images)
                .Map(e =>
                {
                    e.ToTable("ImageTags");
                    e.MapLeftKey("ImageId");
                    e.MapRightKey("TagId");
                });
        }
    }

    public class ImageSummary
    {
        public Guid DocumentId { get; set; }
        public string FilenameOriginal { get; set; }
    }
}
