using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class TestimonialVM
    {
        public TestimonialVM()
        {
            Testimonial = new Testimonial();
            Accounts = new List<Account>();
            ImageSets = new List<ImageSet>();
        }

        public Testimonial Testimonial { get; set; }
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
        public List<ImageSet> ImageSets { get; set; }
    }

    public class TestimonialListVM
    {
        public TestimonialListVM()
        {
            Testimonials = new List<Testimonial>().ToPagedList(1, 1);
            SearchCriteria = new TestimonialSearchCriteria();
        }

        public IPagedList<Testimonial> Testimonials { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public TestimonialSearchCriteria SearchCriteria { get; set; }
    }
}