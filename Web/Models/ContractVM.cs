using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Models
{
    public class ContractVM
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Number { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual ICollection<ContractDocumentVM> Docs { get; set; }
    }
}
