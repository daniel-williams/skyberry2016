using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System.Collections.Generic;

namespace Skyberry.Admin.ViewModels
{
    public class ImageVM
    {
        public ImageVM()
        {
            Image = new Image();
            Tags = new List<Tag>();
        }

        public Image Image { get; set; }
        public List<Tag> Tags { get; set; }
    }

    public class ImageListVM
    {
        public ImageListVM()
        {
            SearchCriteria = new ImageSearchCriteria();
        }

        public IPagedList<Image> Images { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public ImageSearchCriteria SearchCriteria { get; set; }
    }
}