using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Counter
    {
        public Counter()
        {
            CurrentNumber = 1000;
        }

        public Guid CounterId { get; set; }
        [Required]
        public string Name { get; set; }
        public int CurrentNumber { get; set; }
    }

    public class CounterMap : EntityTypeConfiguration<Counter>
    {
        public CounterMap()
        {
            // Table Mapping
            this.ToTable("Counter");

            // Primary Key
            this.HasKey(e => e.CounterId);

            // Properties
            this.Property(e => e.CounterId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50);

            // Column Mappings
            this.Property(e => e.CounterId).HasColumnName("CounterId");
            this.Property(e => e.Name).HasColumnName("Name");
            this.Property(e => e.CurrentNumber).HasColumnName("CurrentNumber");


            // Relationships
        }
    }
}
