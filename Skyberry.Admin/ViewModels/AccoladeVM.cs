using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class AccoladeVM
    {
        public AccoladeVM()
        {
            Accolade = new Accolade();
            ImageSets = new List<ImageSet>();
        }

        public Accolade Accolade { get; set; }
        public List<ImageSet> ImageSets { get; set; }
    }

    public class AccoladeListVM
    {
        public AccoladeListVM()
        {
            Accolades = new List<Accolade>().ToPagedList(1, 1);
            SearchCriteria = new AccoladeSearchCriteria();
        }

        public IPagedList<Accolade> Accolades { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public AccoladeSearchCriteria SearchCriteria { get; set; }
    }
}