using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System.Collections.Generic;

namespace Skyberry.Admin.ViewModels
{
    public class ProjectVM
    {
        public ProjectVM()
        {
            Project = new Project();
            Accounts = new List<Account>();
        }

        public Project Project { get; set; }
        public List<Account> Accounts
        {
            set
            {
                _AccountOpts.Clear();
                _AccountOpts.Add(new ListOpt
                {
                    Id = string.Empty,
                    Value = "none"
                });
                foreach (var item in value)
                {
                    _AccountOpts.Add(new ListOpt
                    {
                        Id = item.Id.ToString(),
                        Value = item.Name
                    });
                }
            }
        }
        private List<ListOpt> _AccountOpts = new List<ListOpt>();
        public List<ListOpt> AccountOpts
        {
            get
            {
                return _AccountOpts;
            }
        }
    }

    public class ProjectListVM
    {
        public ProjectListVM()
        {
            SearchCriteria = new ProjectSearchCriteria();
        }

        public IPagedList<Project> Projects { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public ProjectSearchCriteria SearchCriteria { get; set; }
    }
}