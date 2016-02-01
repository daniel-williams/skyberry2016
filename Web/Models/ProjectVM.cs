using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class ProjectVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }

        [Display(Name = "Start Date")]
        public DateTime? StartDate { get; set; }

        [Display(Name = "Est. Completion Date")]
        public DateTime? EstimatedCompletionDate { get; set; }

        [Display(Name = "Completion Date")]
        public DateTime? CompletionDate { get; set; }

        [Display(Name = "Account ID")]
        public Guid AccountId { get; set; } // TODO djw: jettison? projects array will be a property on account obj

        public virtual ICollection<ContractVM> Contracts { get; set; }
        public virtual ICollection<DesignReviewVM> Reviews { get; set; }

        public virtual ICollection<ProjectDocumentVM> Docs { get; set; }

    }

    public class ProjectListVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Status { get; set; }

    }
}
