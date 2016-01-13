using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System.Collections.Generic;

namespace Skyberry.Admin.ViewModels
{
    public class DesignReviewVM
    {
        public DesignReviewVM()
        {
            DesignReview = new DesignReview();
            Projects = new List<Project>();
        }

        public DesignReview DesignReview { get; set; }
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
    }

    public class DesignReviewListVM
    {
        public DesignReviewListVM()
        {
            SearchCriteria = new DesignReviewSearchCriteria();
        }

        public IPagedList<DesignReview> DesignReviews { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public DesignReviewSearchCriteria SearchCriteria { get; set; }
    }
}