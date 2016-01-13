using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using PagedList;
using System;
using Skyberry.Domain.Linq;

namespace Skyberry.Domain
{
    public interface IImageSetRepository : IRepository<ImageSet>
    {
        IPagedList<ImageSet> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<ImageSet> GetAllPaged(PageSortCriteria pageSortCriteria, ImageSetSearchCriteria searchCriteria);

        ImageSet PortfolioImageSet(Guid id);
    }

    public class ImageSetRepository : RepositoryBase<ImageSet>, IImageSetRepository
    {
        string DEFAULT_SORT = "Name";

        public ImageSetRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override ImageSet GetById(object id)
        {
            ImageSet tag = DbSet.Where(e => e.ImageSetId == (Guid)id).Select(e => e).Include(e => e.Image).Include(e => e.ImageSetItems).Include("ImageSetItems.Image").Include(e => e.Accolades).Include(e => e.Testimonials).FirstOrDefault();

            return tag;
        }

        public override List<ImageSet> GetAll()
        {
            List<ImageSet> query = DbSet.Select(e => e).OrderBy(m => m.Name).Include(e => e.Image).ToList();

            return query;
        }

        public IPagedList<ImageSet> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet.Include(e => e.Image) as IOrderedQueryable<ImageSet>;
            var sorted = LinqExtensions.ApplySortingPaging<ImageSet>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<ImageSet> GetAllPaged(PageSortCriteria pageSortCriteria, ImageSetSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<ImageSet, ImageSetSearchCriteria>(searchCriteria);
            var filtered = DbSet.Include(e => e.Image).Where(predicate) as IOrderedQueryable<ImageSet>;
            var sorted = LinqExtensions.ApplySortingPaging<ImageSet>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<ImageSet> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.ImageSetId)).Select(e => e).ToList();

            return query;
        }

        public ImageSet PortfolioImageSet(Guid id)
        {
            ImageSet query = new ImageSet();

            query = DbSet.Where(e => e.ImageId == id).Include(e => e.ImageSetItems).Include("ImageSetItems.Image").Include(e => e.Testimonials).Include(e => e.Accolades).SingleOrDefault();

            return query;
        }
    }

    public class ImageSetSearchCriteria
    {
        public string Name { get; set; }
    }
}
