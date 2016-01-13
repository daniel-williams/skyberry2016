using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System.Collections.Generic;

namespace Skyberry.Admin.ViewModels
{
    public class ProjectDocumentVM
    {
        public ProjectDocumentVM()
        {
            ProjectDocument = new ProjectDocument();
            ProjectDocumentTypeOpts = ListOpts.ProjectDocumentTypeOpts;
        }

        public ProjectDocument ProjectDocument { get; set; }
        public List<Project> Projects
        {
            set
            {
                _ProjectOpts.Clear();
                _ProjectOpts.Add(new ListOpt
                {
                    Id = string.Empty,
                    Value = "none"
                });
                foreach (var item in value)
                {
                    _ProjectOpts.Add(new ListOpt
                    {
                        Id = item.Id.ToString(),
                        Value = item.Account.Name + " - " + item.Name
                    });
                }
            }
        }

        private List<ListOpt> _ProjectOpts = new List<ListOpt>();
        public List<ListOpt> ProjectOpts
        {
            get
            {
                return _ProjectOpts;
            }
        }

        public IEnumerable<ListOpt> ProjectDocumentTypeOpts { get; set; }
    }

    public class ProjectDocumentListVM
    {
        public ProjectDocumentListVM()
        {
            SearchCriteria = new ProjectDocumentSearchCriteria();
        }

        public IPagedList<ProjectDocument> ProjectDocuments { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public ProjectDocumentSearchCriteria SearchCriteria { get; set; }
    }
}