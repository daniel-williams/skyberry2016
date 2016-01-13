using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Skyberry.Domain
{
    public partial class Contract
    {
        public Contract()
        {
            this.ContractDocuments = new HashSet<ContractDocument>();
            this.Projects = new HashSet<Project>();
        }

        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Number { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual ICollection<ContractDocument> ContractDocuments { get; set; }
        public virtual ICollection<Project> Projects { get; set; }


        public string AccountName
        {
            get
            {
                string result = "";
                if (this.Projects.Count > 0)
                {
                    foreach (var project in this.Projects)
                    {
                        if (project.Account != null)
                        {
                            result = project.Account.Name;
                            break;
                        }
                    }
                }
                return result;
            }
        }
    }

    public class ContractMap : EntityTypeConfiguration<Contract>
    {
        public ContractMap()
        {
            // Table Mapping
            this.ToTable("Contract");

            // Primary Key
            this.HasKey(e => e.Id);

            // Properties
            this.Property(e => e.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(e => e.Title)
                .IsOptional()
                .HasMaxLength(100);

            this.Property(e => e.Number)
                .IsRequired()
                .HasMaxLength(10);


            // Column Mappings
            this.Property(e => e.Id).HasColumnName("ContractId");
            this.Property(e => e.Title).HasColumnName("Title");
            this.Property(e => e.Number).HasColumnName("Number");
            this.Property(e => e.CreatedDate).HasColumnName("CreatedDate");



            // Relationships

        }
    }
}
