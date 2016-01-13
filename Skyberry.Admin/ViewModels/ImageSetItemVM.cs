using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class ImageSetItemVM
    {
        public ImageSetItemVM()
        {
            ImageSetItem = new ImageSetItem();
            ImageSets = new List<ImageSet>();
            Images = new List<Image>();
        }

        public ImageSetItem ImageSetItem { get; set; }

        public List<ImageSet> ImageSets
        {
            set
            {
                _ImageSetOpts.Clear();
                _ImageSetOpts.Add(new ListOpt
                {
                    Id = string.Empty,
                    Value = "none"
                });
                foreach (var item in value)
                {
                    _ImageSetOpts.Add(new ListOpt
                    {
                        Id = item.ImageSetId.ToString(),
                        Value = item.Name
                    });
                }
            }
        }
        private List<ListOpt> _ImageSetOpts = new List<ListOpt>();
        public List<ListOpt> ImageSetOpts
        {
            get
            {
                return _ImageSetOpts;
            }
        }

        public List<Image> Images
        {
            set
            {
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
                        Value = item.FilenameOriginal
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

    public class ImageSetItemListVM
    {
        public ImageSetItemListVM()
        {

        }

        public IPagedList<ImageSetItem> ImageSetItems { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public ImageSetItemSearchCriteria SearchCriteria { get; set; }
    }


}