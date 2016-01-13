using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using PagedList;
using System;
using Skyberry.Domain.Linq;

namespace Skyberry.Domain
{
    public interface IImageRepository : IRepository<Image>
    {
        IPagedList<Image> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Image> GetAllPaged(PageSortCriteria pageSortCriteria, ImageSearchCriteria searchCriteria);

        List<Image> PortfolioImages(string filter1, string filter2);
    }

    public class ImageRepository : RepositoryBase<Image>, IImageRepository
    {
        string DEFAULT_SORT = "FilenameOriginal";

        public ImageRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override Image GetById(object id)
        {
            Image query = DbSet.Where(e => e.Id == (Guid)id).Select(e => e).Include(e => e.Tags).SingleOrDefault();

            return query;
        }

        public override List<Image> GetAll()
        {
            List<Image> query = DbSet.Select(e => e).OrderBy(e => e.Title).ThenBy(e => e.FilenameOriginal).ToList();

            return query;
        }

        public IPagedList<Image> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet as IOrderedQueryable<Image>;
            var sorted = LinqExtensions.ApplySortingPaging<Image>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Image> GetAllPaged(PageSortCriteria pageSortCriteria, ImageSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Image, ImageSearchCriteria>(searchCriteria);
            var filtered = DbSet.Where(predicate) as IOrderedQueryable<Image>;
            var sorted = LinqExtensions.ApplySortingPaging<Image>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<Image> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }

        public List<Image> PortfolioImages(string filter1, string filter2)
        {
            List<String> filterList = new List<String>();

            if (!string.IsNullOrEmpty(filter2) && filter2.ToLower() == "featured")
            {
                if (!string.IsNullOrEmpty(filter1))
                {
                    filter2 = "Featured-" + filter1;
                }
            }

            if (!string.IsNullOrEmpty(filter1) && filter1.ToLower() != "all")
            {
                filterList.Add(filter1);
            }

            if (!string.IsNullOrEmpty(filter2) && filter2.ToLower() != "all")
            {
                filterList.Add(filter2);
            }


            var records = from img in Context.Images
                          from tag in img.Tags
                          where img.IsActive && tag.Name.Equals("browser")
                          select img;


            if (filterList.Count > 0 && filterList[0].Length > 0)
            {
                var filter = filterList[0];

                records = from img in records
                          from tag in img.Tags
                          where tag.Name.Equals(filter)
                          select img;

            }

            if (filterList.Count > 1 && filterList[1].Length > 0)
            {
                var filter = filterList[1];

                records = from img in records
                          from tag in img.Tags
                          where tag.Name.Equals(filter)
                          select img;

            }

            return records.OrderByDescending(e => e.CreatedDate).ToList();
        }
    }

    public class ImageSearchCriteria
    {
        [FieldMap("FilenameOriginal")]
        public string Filename { get; set; }
        public string Title { get; set; }
        public string Version { get; set; }
    }
}
