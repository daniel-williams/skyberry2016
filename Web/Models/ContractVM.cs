using System;
using System.Collections.Generic;

namespace Web.Models
{
    public class ContractVM
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Number { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual ICollection<ContractDocumentVM> Docs { get; set; }
    }
}
