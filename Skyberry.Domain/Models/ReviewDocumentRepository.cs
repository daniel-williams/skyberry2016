using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using PagedList;
using System;
using Skyberry.Domain.Linq;

namespace Skyberry.Domain
{
    public interface IReviewDocumentRepository : IRepository<ReviewDocument>
    {
        List<ReviewDocument> GetByDesignReviewId(Guid designReviewId);

        IPagedList<ReviewDocument> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<ReviewDocument> GetAllPaged(PageSortCriteria pageSortCriteria, ReviewDocumentSearchCriteria searchCriteria);
    }

    public class ReviewDocumentRepository : RepositoryBase<ReviewDocument>, IReviewDocumentRepository
    {
        string DEFAULT_SORT = "FilenameOriginal";

        public ReviewDocumentRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override ReviewDocument GetById(object id)
        {
            ReviewDocument query = DbSet.Where(e => e.Id == (Guid)id).Select(e => e).SingleOrDefault();

            return query;
        }

        public override List<ReviewDocument> GetAll()
        {
            List<ReviewDocument> query = DbSet.Select(e => e).ToList();

            return query;
        }

        public List<ReviewDocument> GetByDesignReviewId(Guid designReviewId)
        {
            List<ReviewDocument> query = DbSet.Where(e => e.DesignReviewId == designReviewId).Include(e => e.DesignReview).Include("DesignReview.Project").Include("DesignReview.Project.Account").Select(e => e).ToList();

            return query;
        }

        public IPagedList<ReviewDocument> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet.Include(e=>e.DesignReview).Include("DesignReview.Project").Include("DesignReview.Project.Account") as IOrderedQueryable<ReviewDocument>;
            var sorted = LinqExtensions.ApplySortingPaging<ReviewDocument>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<ReviewDocument> GetAllPaged(PageSortCriteria pageSortCriteria, ReviewDocumentSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<ReviewDocument, ReviewDocumentSearchCriteria>(searchCriteria);
            var filtered = DbSet.Include(e => e.DesignReview).Include("DesignReview.Project").Include("DesignReview.Project.Account").Where(predicate) as IOrderedQueryable<ReviewDocument>;
            var sorted = LinqExtensions.ApplySortingPaging<ReviewDocument>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<ReviewDocument> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }
    }

    public class ReviewDocumentSearchCriteria
    {
        [FieldMap("FilenameOriginal")]
        public string Filename { get; set; }
        public string Title { get; set; }
        public string Version { get; set; }
    }
}
