using System;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class ReviewDocument : Document
    {
        public string DocType { get; set; }
        public byte Order { get; set; }

        public Guid DesignReviewId { get; set; }
        public virtual DesignReview DesignReview { get; set; }
    }

    public class ReviewDocumentMap : EntityTypeConfiguration<ReviewDocument>
    {
        public ReviewDocumentMap()
        {
            // Table Mapping
            this.ToTable("ReviewDocument");

            // Primary Key


            // Properties
            this.Property(e => e.DocType)
                .IsOptional()
                .HasMaxLength(50);


            // Column Mappings
            this.Property(e => e.DocType).HasColumnName("DocType");
            this.Property(e => e.Order).HasColumnName("Order");
            this.Property(e => e.DesignReviewId).HasColumnName("DesignReviewId");



            // Relationships
            this.HasRequired<DesignReview>(e => e.DesignReview)
                .WithMany(e => e.ReviewDocuments)
                .HasForeignKey(e => e.DesignReviewId)
                .WillCascadeOnDelete(false);
        }
    }
}
