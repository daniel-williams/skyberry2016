using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using PagedList;
using System;
using Skyberry.Domain.Linq;

namespace Skyberry.Domain
{
    public interface ITagRepository : IRepository<Tag>
    {
        IPagedList<Tag> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Tag> GetAllPaged(PageSortCriteria pageSortCriteria, TagSearchCriteria searchCriteria);

        List<string> PortfolioFilters(string parent);
    }

    public class TagRepository : RepositoryBase<Tag>, ITagRepository
    {
        string DEFAULT_SORT = "Name";

        public TagRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override Tag GetById(object id)
        {
            Tag tag = DbSet.Where(e => e.TagId == (Guid)id).Select(e => e).Include(e => e.Images).FirstOrDefault();

            return tag;
        }

        public override List<Tag> GetAll()
        {
            List<Tag> query = DbSet.Select(e => e).OrderBy(m => m.Name).Include(e => e.Images).ToList();

            return query;
        }

        public IPagedList<Tag> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet.Include(e => e.Images) as IOrderedQueryable<Tag>;
            var sorted = LinqExtensions.ApplySortingPaging<Tag>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Tag> GetAllPaged(PageSortCriteria pageSortCriteria, TagSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Tag, TagSearchCriteria>(searchCriteria);
            var filtered = DbSet.Include(e => e.Images).Where(predicate) as IOrderedQueryable<Tag>;
            var sorted = LinqExtensions.ApplySortingPaging<Tag>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<Tag> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.TagId)).Select(e => e).ToList();

            return query;
        }

        public List<string> PortfolioFilters(string parent = "")
        {
            List<string> query = new List<string>();

            if (string.IsNullOrWhiteSpace(parent) || parent.ToLower() == "all")
            {
                query = DbSet.Where(e => e.IsActive && e.IsFilter).OrderBy(e => e.Name).Select(e => e.Name).ToList();
            }
            else
            {
                var images = (from img in Context.Images
                              from tag in img.Tags
                              where tag.Name.Equals(parent)
                              select img);

                query = (from items in images
                         from tag in items.Tags
                         where tag.IsActive && tag.IsFilter
                         select tag.Name).Distinct().ToList();
            }

            return query;
        }
    }

    public class TagSearchCriteria
    {
        public string Name { get; set; }
    }
}