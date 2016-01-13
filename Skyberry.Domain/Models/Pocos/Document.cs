using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Document
    {
        public Document()
        {
            IsActive = true;
        }

        public Guid Id { get; set; }

        public string Filename { get; set; }
        [Display(Name = "Created")]
        public string FilenameOriginal { get; set; }
        public byte[] FileData { get; set; }
        [Display(Name = "Path")]
        public string FilePath { get; set; }
        [Display(Name = "Extension")]
        public string FileExt { get; set; }
        [Display(Name = "Mime Type")]
        public string FileMimeType { get; set; }
        [Display(Name = "Size")]
        public int FileSize { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string Version { get; set; }
        [Display(Name = "Created Date")]
        public DateTime CreatedDate { get; set; }
        [Display(Name="Active")]
        public bool IsActive { get; set; }
    }

    public class DocumentMap : EntityTypeConfiguration<Document>
    {
        public DocumentMap()
        {
            // Table Mapping
            this.ToTable("Document");

            // Primary Key
            this.HasKey(e => e.Id);

            // Properties
            this.Property(e => e.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.Filename)
                .IsRequired()
                .HasMaxLength(255);

            this.Property(e => e.FilenameOriginal)
                .IsOptional()
                .HasMaxLength(255);

            this.Property(e => e.FilePath)
                .IsRequired()
                .HasMaxLength(255);

            this.Property(e => e.FileExt)
                .IsOptional()
                .HasMaxLength(25);

            this.Property(e => e.FileMimeType)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(e => e.Title)
                .IsOptional()
                .HasMaxLength(100);

            this.Property(e => e.Description)
                .IsOptional()
                .HasMaxLength(2000);

            this.Property(e => e.Version)
                .IsOptional()
                .HasMaxLength(20);




            // Column Mappings
            this.Property(e => e.Id).HasColumnName("DocumentId");
            this.Property(e => e.Filename).HasColumnName("Filename");


            // Relationships

        }
    }
}
