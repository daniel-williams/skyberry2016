using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Skyberry.Core;

namespace Skyberry.Domain
{
    public partial class ReviewComment
    {
        public ReviewComment()
        {
            DateTime now = DateTime.UtcNow;

            Id = IdGen.NewId(20);
            Created = now;
            Modified = now;
        }

        public string Id { get; set; }
        public string Comment { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public Guid OrderId { get; set; }
        public Guid UserId { get; set;  }
        public string Username { get; set; }

        public Guid DesignReviewId { get; set; }
        public virtual DesignReview DesignReview { get; set; }
    }

    public class ReviewCommentMap : EntityTypeConfiguration<ReviewComment>
    {
        public ReviewCommentMap()
        {
            // Table Mapping
            this.ToTable("ReviewComment");

            // Primary Key
            this.HasKey(e => e.Id);

            // Properties
            this.Property(e => e.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(20);

            this.Property(e => e.Comment)
                .IsRequired();

            this.Property(e => e.Username)
                .IsOptional()
                .HasMaxLength(100);

            // Column Mappings


            // Relationships
            this.HasRequired<DesignReview>(e => e.DesignReview)
                .WithMany(e => e.ReviewComments)
                .HasForeignKey(e => e.DesignReviewId)
                .WillCascadeOnDelete(false);

        }
    }
}
