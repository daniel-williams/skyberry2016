using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class ContractVM
    {
        public ContractVM()
        {
            Contract = new Contract();
            Projects = new List<Project>();
        }

        public Contract Contract { get; set; }
        public List<Project> Projects { get; set; }
    }

    public class ContractListVM
    {
        public ContractListVM()
        {

        }

        public IPagedList<Contract> Contracts { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public ContractSearchCriteria SearchCriteria { get; set; }
    }


}