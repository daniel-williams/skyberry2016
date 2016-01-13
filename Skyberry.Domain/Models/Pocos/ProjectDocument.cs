using System;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class ProjectDocument : Document
    {
        public string DocType { get; set; }

        public Guid ProjectId { get; set; }
        public virtual Project Project { get; set; }
    }

    public class ProjectDocumentMap : EntityTypeConfiguration<ProjectDocument>
    {
        public ProjectDocumentMap()
        {
            // Table Mapping
            this.ToTable("ProjectDocument");

            // Primary Key

            // Properties
            this.Property(e => e.DocType)
                .IsOptional()
                .HasMaxLength(50);


            // Column Mappings
            this.Property(e => e.DocType).HasColumnName("DocType");
            this.Property(e => e.ProjectId).HasColumnName("ProjectId");


            // Relationships
            this.HasRequired<Project>(e => e.Project)
                .WithMany(e => e.ProjectDocuments)
                .HasForeignKey(e => e.ProjectId)
                .WillCascadeOnDelete(false);
        }
    }
}
