using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Payment
    {
        public Payment()
        {
            PaymentDate = DateTime.Now.Date;
        }
        public Guid Id { get; set; }
        [Required]
        [Range(1, double.MaxValue, ErrorMessage=("Amount must be a positive number."))]
        public decimal Amount { get; set; }
        [Display(Name = "Payment Type")]
        public string PaymentType { get; set; }
        [Display(Name = "Payment Date")]
        public DateTime? PaymentDate { get; set; }
        [Display(Name = "Created Date")]
        public DateTime CreatedDate { get; set; }

        [Display(Name="Account")]
        public Guid AccountId { get; set; }
        public virtual Account Account { get; set; }
    }



    public class PaymentMap : EntityTypeConfiguration<Payment>
    {
        public PaymentMap()
        {
            // Table Mapping
            this.ToTable("Payment");

            // Primary Key
            this.HasKey(e => e.Id);

            // Properties
            this.Property(e => e.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.Amount)
                .IsOptional()
                .HasPrecision(18, 2);

            this.Property(e => e.PaymentType)
                .IsOptional()
                .HasMaxLength(50);


            // Column Mappings
            this.Property(e => e.Id).HasColumnName("PaymentId");
            this.Property(e => e.Amount).HasColumnName("Amount");
            this.Property(e => e.PaymentType).HasColumnName("PaymentType");
            this.Property(e => e.PaymentDate).HasColumnName("PaymentDate");
            this.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
            this.Property(e => e.AccountId).HasColumnName("AccountId");



            // Relationships
            this.HasRequired<Account>(e => e.Account)
                .WithMany(e => e.Payments)
                .HasForeignKey(e => e.AccountId)
                .WillCascadeOnDelete(false);
        }
    }
}
