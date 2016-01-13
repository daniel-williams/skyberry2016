using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System.Collections.Generic;

namespace Skyberry.Admin.ViewModels
{
    public class TagVM
    {
        public TagVM()
        {
            Tag = new Tag();
        }

        public Tag Tag { get; set; }
        public List<Image> Images { get; set; }
    }

    public class TagListVM
    {
        public TagListVM()
        {
            PageSortCriteria = new PageSortCriteria();
            SearchCriteria = new TagSearchCriteria();
        }

        public IPagedList<Tag> Tags { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public TagSearchCriteria SearchCriteria { get; set; }
    }
}