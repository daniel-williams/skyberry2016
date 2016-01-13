using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class DesignReview
    {
        public DesignReview()
        {
            this.ReviewComments = new HashSet<ReviewComment>();
            this.ReviewDocuments = new HashSet<ReviewDocument>();
            this.IsActive = true;

            this.CreatedDate = DateTime.UtcNow;
        }

        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Display(Name = "Selected Comment")]
        public string SelectedComment { get; set; }

        [Display(Name = "Additional Comment")]
        public string AdditionalComment { get; set; }

        [Display(Name = "Created Date")]
        public DateTime CreatedDate { get; set; }




        public string RequestById { get; set; }
        public string RequestByName { get; set; }
        public string RequestByIp { get; set; }
        public RequestType RequestType { get; set; }
        public DateTime? RequestDate { get; set; }

        public string ApprovedById { get; set; }
        public string ApprovedByName { get; set; }
        public string ApprovedByIp { get; set; }
        public DateTime? ApprovedDate { get; set; }


        [Display(Name = "Accepted Date")]
        public DateTime? AcceptedDate { get; set; }

        [Display(Name="Active")]
        public bool IsActive { get; set; }


        [Display(Name="Project")]
        public Guid ProjectId { get; set; }
        public virtual Project Project { get; set; }

        [Display(Name = "Selected Document")]
        public Guid? SelectedReviewDocumentId { get; set; }
        public virtual ReviewDocument SelectedReviewDocument { get; set; }

        public virtual ICollection<ReviewComment> ReviewComments { get; set; }
        public virtual ICollection<ReviewDocument> ReviewDocuments { get; set; }
    }

    public class DesignReviewMap : EntityTypeConfiguration<DesignReview>
    {
        public DesignReviewMap()
        {
            // Table Mapping
            this.ToTable("DesignReview");

            // Primary Key
            this.HasKey(e => e.Id);

            // Properties
            this.Property(e => e.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(e => e.Description)
                .IsOptional()
                .HasMaxLength(2000);

            this.Property(e => e.SelectedComment)
                .IsOptional()
                .HasMaxLength(2000);

            this.Property(e => e.AdditionalComment)
                .IsOptional()
                .HasMaxLength(2000);


            this.Property(e => e.RequestById)
                .IsOptional()
                .HasMaxLength(36);

            this.Property(e => e.RequestByName)
                .IsOptional()
                .HasMaxLength(100);

            this.Property(e => e.RequestByIp)
                .IsOptional()
                .HasMaxLength(45);



            this.Property(e => e.ApprovedById)
                .IsOptional()
                .HasMaxLength(36);

            this.Property(e => e.ApprovedByName)
                .IsOptional()
                .HasMaxLength(100);

            this.Property(e => e.ApprovedByIp)
                .IsOptional()
                .HasMaxLength(45);



            // Column Mappings
            this.Property(e => e.Id).HasColumnName("DesignReviewId");


            // Relationships
            this.HasRequired<Project>(e => e.Project)
                .WithMany(e => e.DesignReviews)
                .HasForeignKey(e => e.ProjectId)
                .WillCascadeOnDelete(false);

            this.HasOptional(e => e.SelectedReviewDocument)
                .WithMany()
                .HasForeignKey(e => e.SelectedReviewDocumentId);
        }
    }


    public enum RequestType
    {
        None = 0,
        Revision = 1,
        Deliverables = 2
    }

}
