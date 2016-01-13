using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Tag
    {
        public Tag()
        {
            this.Images = new HashSet<Image>();
        }

        public Guid TagId { get; set; }
        public string Name { get; set; }
        public bool IsFilter { get; set; }
        public bool IsActive { get; set; }

        public virtual ICollection<Image> Images { get; set; }
    }

    public class TagMap : EntityTypeConfiguration<Tag>
    {
        public TagMap()
        {
            // Table Mapping
            this.ToTable("Tag");

            // Primary Key
            this.HasKey(e => e.TagId);

            // Properties
            this.Property(e => e.TagId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);


            // Column Mappings
            this.Property(e => e.TagId).HasColumnName("TagId");
            this.Property(e => e.Name).HasColumnName("Name");
            this.Property(e => e.IsFilter).HasColumnName("IsFilter");
            this.Property(e => e.IsActive).HasColumnName("IsActive");



            // Relationships

        }
    }
}
