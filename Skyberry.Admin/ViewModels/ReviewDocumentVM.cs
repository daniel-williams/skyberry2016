using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System.Collections.Generic;

namespace Skyberry.Admin.ViewModels
{
    public class ReviewDocumentVM
    {
        public ReviewDocumentVM()
        {
            ReviewDocument = new ReviewDocument();
            ReviewDocumentTypeOpts = ListOpts.ReviewDocumentTypeOpts;
        }

        public ReviewDocument ReviewDocument { get; set; }
        public List<DesignReview> DesignReviews
        {
            set
            {
                _DesignReviewOpts.Clear();
                _DesignReviewOpts.Add(new ListOpt
                {
                    Id = string.Empty,
                    Value = "none"
                });
                foreach (var item in value)
                {
                    _DesignReviewOpts.Add(new ListOpt
                    {
                        Id = item.Id.ToString(),
                        Value = item.Project.Account.Name + " - " + item.Project.Name + " - " + item.Title
                    });
                }
            }
        }

        private List<ListOpt> _DesignReviewOpts = new List<ListOpt>();
        public List<ListOpt> DesignReviewOpts
        {
            get
            {
                return _DesignReviewOpts;
            }
        }

        public IEnumerable<ListOpt> ReviewDocumentTypeOpts { get; set; }
    }

    public class ReviewDocumentListVM
    {
        public ReviewDocumentListVM()
        {
            SearchCriteria = new ReviewDocumentSearchCriteria();
        }

        public IPagedList<ReviewDocument> ReviewDocuments { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public ReviewDocumentSearchCriteria SearchCriteria { get; set; }
    }
}