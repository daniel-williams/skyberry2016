using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface ITestimonialRepository : IRepository<Testimonial>
    {
        IPagedList<Testimonial> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Testimonial> GetAllPaged(PageSortCriteria pageSortCriteria, TestimonialSearchCriteria searchCriteria);

        List<Testimonial> GetFeatured();
    }

    public class TestimonialRepository : RepositoryBase<Testimonial>, ITestimonialRepository
    {
        string DEFAULT_SORT = "Title";

        public TestimonialRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override Testimonial GetById(object id)
        {
            Testimonial query = DbSet.Where(e => e.TestimonialId == (Guid)id).Select(e => e).Include(e => e.Account).Include(e => e.ImageSets).Include("ImageSets.Image").FirstOrDefault();

            return query;
        }

        public override List<Testimonial> GetAll()
        {
            List<Testimonial> query = DbSet.Select(e => e).OrderBy(m => m.Title).ToList();

            return query;
        }

        public IPagedList<Testimonial> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet.Include(e=>e.Account) as IOrderedQueryable<Testimonial>;
            var sorted = LinqExtensions.ApplySortingPaging<Testimonial>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Testimonial> GetAllPaged(PageSortCriteria pageSortCriteria, TestimonialSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Testimonial, TestimonialSearchCriteria>(searchCriteria);
            var filtered = DbSet.Include(e => e.Account).Where(predicate) as IOrderedQueryable<Testimonial>;
            var sorted = LinqExtensions.ApplySortingPaging<Testimonial>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<Testimonial> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.TestimonialId)).Select(e => e).ToList();

            return query;
        }


        public List<Testimonial> GetFeatured()
        {
            List<Testimonial> query = DbSet.Where(e => e.IsFeatured).Select(e => e).ToList();

            return query;
        }
    }

    public class TestimonialSearchCriteria
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
