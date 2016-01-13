using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class ImageSetItem
    {
        public Guid ImageSetItemId { get; set; }
        [Required]
        public byte Position { get; set; }

        [Display(Name = "Image")]
        public Guid ImageId { get; set; }
        public virtual Image Image { get; set; }

        [Display(Name = "Image Set")]
        public Guid ImageSetId { get; set; }
        public virtual ImageSet ImageSet { get; set; }
    }

    public class ImageSetItemMap : EntityTypeConfiguration<ImageSetItem>
    {
        public ImageSetItemMap()
        {
            // Table Mapping
            this.ToTable("ImageSetItem");

            // Primary Key
            this.HasKey(e => e.ImageSetItemId);

            // Properties
            this.Property(e => e.ImageSetItemId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);


            // Column Mappings
            this.Property(e => e.ImageSetItemId).HasColumnName("ImageSetItemId");
            this.Property(e => e.Position).HasColumnName("Position");
            this.Property(e => e.ImageId).HasColumnName("ImageId");
            this.Property(e => e.ImageSetId).HasColumnName("ImageSetId");



            // Relationships
            this.HasRequired<Image>(e => e.Image)
                .WithMany(e => e.ImageSetItems)
                .HasForeignKey(e => e.ImageId)
                .WillCascadeOnDelete(false);

            this.HasRequired<ImageSet>(e => e.ImageSet)
                .WithMany(e => e.ImageSetItems)
                .HasForeignKey(e => e.ImageSetId)
                .WillCascadeOnDelete(false);
        }
    }
}
