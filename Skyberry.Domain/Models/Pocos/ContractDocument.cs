using System;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class ContractDocument : Document
    {
        public string DocType { get; set; }

        public Guid ContractId { get; set; }
        public virtual Contract Contract { get; set; }   
    }


    public class ContractDocumentMap : EntityTypeConfiguration<ContractDocument>
    {
        public ContractDocumentMap()
        {
            // Table Mapping
            this.ToTable("ContractDocument");

            // Primary Key


            // Properties
            this.Property(e => e.DocType)
                .IsOptional()
                .HasMaxLength(50);


            // Column Mappings
            this.Property(e => e.DocType).HasColumnName("DocType");
            this.Property(e => e.ContractId).HasColumnName("ContractId");


            // Relationships
            this.HasRequired<Contract>(e => e.Contract)
                .WithMany(e => e.ContractDocuments)
                .HasForeignKey(e => e.ContractId)
                .WillCascadeOnDelete(false);
        }
    }

    //public enum ContractDocumentType
    //{
    //    Initial,
    //    ClientChanges,
    //    SkyberryChanges,
    //    FinalSigned
    //}
}
