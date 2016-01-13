using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Invoice : Document
    {
        public Invoice()
        {
            DateTime now = DateTime.Now;

            SentDate = now.Date;
            DueDate = now.AddDays(15).Date;
        }

        [Display(Name="Number")]
        public string InvoiceNumber { get; set; }
        
        public decimal Amount { get; set; }
        [Display(Name = "Sent Date")]
        public DateTime? SentDate { get; set; }
        [Display(Name = "Due Date")]
        public DateTime? DueDate { get; set; }
        [Display(Name = "Estimate")]
        public bool IsEstimate { get; set; }

        [Display(Name = "Account")]
        public Guid AccountId { get; set; }
        public virtual Account Account { get; set; }
        [Display(Name = "Project")]
        public Guid? ProjectId { get; set; }
        public virtual Project Project { get; set; }
    }

    public class InvoiceMap : EntityTypeConfiguration<Invoice>
    {
        public InvoiceMap()
        {
            // Table Mapping
            this.ToTable("Invoice");

            // Primary Key

            // Properties
            this.Property(e => e.InvoiceNumber)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(e => e.Amount)
                .IsOptional()
                .HasPrecision(18, 2);


            // Column Mappings
            this.Property(e => e.InvoiceNumber).HasColumnName("InvoiceNumber");
            this.Property(e => e.Amount).HasColumnName("Amount");
            this.Property(e => e.SentDate).HasColumnName("SentDate");
            this.Property(e => e.DueDate).HasColumnName("DueDate");
            this.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
            this.Property(e => e.IsEstimate).HasColumnName("IsEstimate");
            this.Property(e => e.AccountId).HasColumnName("AccountId");
            this.Property(e => e.ProjectId).HasColumnName("ProjectId");



            // Relationships
            this.HasRequired<Account>(e => e.Account)
                .WithMany(e => e.Invoices)
                .HasForeignKey(e => e.AccountId)
                .WillCascadeOnDelete(false);

            this.HasOptional<Project>(e => e.Project)
                .WithMany(e => e.Invoices)
                .HasForeignKey(e => e.ProjectId)
                .WillCascadeOnDelete(false);
        }
    }
}
