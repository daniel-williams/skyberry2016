using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface IImageSetItemRepository : IRepository<ImageSetItem>
    {
        List<ImageSetItem> GetByImageSetId(Guid imageSetId);
        IPagedList<ImageSetItem> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<ImageSetItem> GetAllPaged(PageSortCriteria pageSortCriteria, ImageSetItemSearchCriteria searchCriteria);
    }

    public class ImageSetItemRepository : RepositoryBase<ImageSetItem>, IImageSetItemRepository
    {
        string DEFAULT_SORT = "Position";

        public ImageSetItemRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public List<ImageSetItem> GetByImageSetId(Guid imageSetId)
        {
            List<ImageSetItem> query = DbSet.Where(e => e.ImageSetId == imageSetId).Select(e => e).Include(e => e.ImageSet).Include(e => e.Image).ToList();

            return query;
        }

        public override ImageSetItem GetById(object id)
        {
            ImageSetItem query = DbSet.Where(e => e.ImageSetItemId == (Guid)id).Select(e => e).Include(e => e.ImageSet).Include(e => e.Image).SingleOrDefault();

            return query;
        }

        public override List<ImageSetItem> GetAll()
        {
            List<ImageSetItem> query = DbSet.Select(e => e).Include(e => e.ImageSet).Include(e => e.Image).ToList();

            return query;
        }

        public IPagedList<ImageSetItem> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet.Include(e => e.ImageSet).Include(e => e.Image) as IOrderedQueryable<ImageSetItem>;
            var sorted = LinqExtensions.ApplySortingPaging<ImageSetItem>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<ImageSetItem> GetAllPaged(PageSortCriteria pageSortCriteria, ImageSetItemSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<ImageSetItem, ImageSetItemSearchCriteria>(searchCriteria);
            var filtered = DbSet.Include(e => e.ImageSet).Include(e => e.Image).Where(predicate) as IOrderedQueryable<ImageSetItem>;
            var sorted = LinqExtensions.ApplySortingPaging<ImageSetItem>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<ImageSetItem> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.ImageSetItemId)).Select(e => e).ToList();

            return query;
        }
    }

    public class ImageSetItemSearchCriteria
    {
        public string Position { get; set; }
    }
}
