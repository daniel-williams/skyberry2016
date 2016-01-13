using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System;
using System.Collections.Generic;

namespace Skyberry.Admin.ViewModels
{
    public class ImageSetVM
    {
        public ImageSetVM()
        {
            ImageSet = new ImageSet();
        }

        public ImageSet ImageSet { get; set; }
        public List<Image> _Images = new List<Image>();
        public List<Image> Images
        {
            get
            {
                return _Images;
            }
            set
            {
                _Images = value;
                _ImageOpts.Clear();
                _ImageOpts.Add(new ListOpt
                {
                    Id = string.Empty,
                    Value = "none"
                });
                foreach (var item in value)
                {
                    _ImageOpts.Add(new ListOpt
                    {
                        Id = item.Id.ToString(),
                        Value = item.Title + " - " + item.FilenameOriginal
                    });
                }
            }
        }
        private List<ListOpt> _ImageOpts = new List<ListOpt>();
        public List<ListOpt> ImageOpts
        {
            get
            {
                return _ImageOpts;
            }
        }
    }

    public class ImageSetListVM
    {
        public ImageSetListVM()
        {
            PageSortCriteria = new PageSortCriteria();
            SearchCriteria = new ImageSetSearchCriteria();
        }

        public IPagedList<ImageSet> ImageSets { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public ImageSetSearchCriteria SearchCriteria { get; set; }
    }

}