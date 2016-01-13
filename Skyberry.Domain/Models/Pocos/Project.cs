using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Project
    {
        public Project()
        {
            this.DesignReviews = new HashSet<DesignReview>();
            this.Invoices = new HashSet<Invoice>();
            this.ProjectDocuments = new HashSet<ProjectDocument>();
            this.Contracts = new HashSet<Contract>();
        }

        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        [Display(Name="Start Date")]
        public DateTime? StartDate { get; set; }
        [Display(Name = "Est. Completion Date")]
        public DateTime? EstimatedCompletionDate { get; set; }
        [Display(Name = "Completion Date")]
        public DateTime? CompletionDate { get; set; }
        [Display(Name = "Created Date")]
        public DateTime CreatedDate { get; set; }

        [Display(Name = "Account")]
        public Guid AccountId { get; set; }
        public virtual Account Account { get; set; }

        public virtual ICollection<DesignReview> DesignReviews { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
        public virtual ICollection<ProjectDocument> ProjectDocuments { get; set; }
        public virtual ICollection<Contract> Contracts { get; set; }
    }

    public class ProjectMap : EntityTypeConfiguration<Project>
    {
        public ProjectMap()
        {
            // Table Mapping
            this.ToTable("Project");

            // Primary Key
            this.HasKey(e => e.Id);

            // Properties
            this.Property(e => e.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(200);

            this.Property(e => e.Description)
                .IsOptional()
                .HasMaxLength(2000);

            this.Property(e => e.Status)
                .IsOptional()
                .HasMaxLength(100);


            // Column Mappings
            this.Property(e => e.Id).HasColumnName("ProjectId");
            this.Property(e => e.Name).HasColumnName("Name");
            this.Property(e => e.Description).HasColumnName("Description");
            this.Property(e => e.Status).HasColumnName("Status");
            this.Property(e => e.StartDate).HasColumnName("StartDate");
            this.Property(e => e.EstimatedCompletionDate).HasColumnName("EstimatedCompletionDate");
            this.Property(e => e.CompletionDate).HasColumnName("CompletionDate");
            this.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
            this.Property(e => e.AccountId).HasColumnName("AccountId");



            // Relationships
            this.HasMany<Contract>(e => e.Contracts)
                .WithMany(e => e.Projects)
                .Map(e =>
                {
                    e.ToTable("ProjectContracts");
                    e.MapLeftKey("ProjectId");
                    e.MapRightKey("ContractId");
                });

            this.HasRequired<Account>(e => e.Account)
                .WithMany(e => e.Projects)
                .HasForeignKey(e => e.AccountId)
                .WillCascadeOnDelete(false);
        }
    }
}
