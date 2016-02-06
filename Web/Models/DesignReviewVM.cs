using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Models
{
    public class DesignReviewVM
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }

        [Display(Name = "Selected Comment")]
        public string SelectedComment { get; set; }

        [Display(Name = "Additional Comment")]
        public string AdditionalComment { get; set; }

        [Display(Name = "Created Date")]
        public DateTime CreatedDate { get; set; }


        public string RequestById { get; set; }
        public string RequestByName { get; set;}

        [Display(Name = "Request Type")]
        public RequestType RequestType { get; set; }

        [Display(Name = "Request Date")]
        public DateTime? RequestDate { get; set; }

        public string ApprovedById { get; set; }
        public string ApprovedByName { get; set; }

        [Display(Name = "Approved Date")]
        public DateTime? ApprovedDate { get; set; }


        [Display(Name = "Accepted Date")]
        public DateTime? AcceptedDate { get; set; }

        [Display(Name = "Active")]
        public bool IsActive { get; set; }

        [Display(Name = "Selected ID")]
        public Guid? SelectedId { get; set; }

        public ICollection<ReviewCommentVM> Comments { get; set; }
        //public ICollection<ReviewDocumentVM> Docs { get; set; }
        public ICollection<ReviewDocumentVM> Options { get; set; }
        public ICollection<ReviewDocumentVM> Proofs { get; set; }
    }
}
