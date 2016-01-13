using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System.Collections.Generic;

namespace Skyberry.Admin.ViewModels
{
    public class ContractDocumentVM
    {
        public ContractDocumentVM()
        {
            ContractDocument = new ContractDocument();
            ContractDocumentTypeOpts = ListOpts.ContractDocumentTypeOpts;
        }

        public ContractDocument ContractDocument { get; set; }
        public List<Contract> Contracts
        {
            set
            {
                _ContractOpts.Clear();
                _ContractOpts.Add(new ListOpt
                {
                    Id = string.Empty,
                    Value = "none"
                });
                foreach (var item in value)
                {
                    string prefix = "";
                    foreach(var project in item.Projects)
                    {
                        prefix = project.Account.Name + " - ";
                        break;
                    }
                    _ContractOpts.Add(new ListOpt
                    {
                        Id = item.Id.ToString(),
                        Value = prefix + item.Number
                    });
                }
            }
        }

        private List<ListOpt> _ContractOpts = new List<ListOpt>();
        public List<ListOpt> ContractOpts
        {
            get
            {
                return _ContractOpts;
            }
        }

        public IEnumerable<ListOpt> ContractDocumentTypeOpts { get; set; }
    }

    public class ContractDocumentListVM
    {
        public ContractDocumentListVM()
        {
            SearchCriteria = new ContractDocumentSearchCriteria();
        }

        public IPagedList<ContractDocument> ContractDocuments { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public ContractDocumentSearchCriteria SearchCriteria { get; set; }
    }
}