using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface IDesignReviewRepository : IRepository<DesignReview>
    {
        IPagedList<DesignReview> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<DesignReview> GetAllPaged(PageSortCriteria pageSortCriteria, DesignReviewSearchCriteria searchCriteria);

        DesignReview DashboardGetById(Guid id);
        DesignReview GetOwnById(Guid id, string userId);
    }

    public class DesignReviewRepository : RepositoryBase<DesignReview>, IDesignReviewRepository
    {
        string DEFAULT_SORT = "Title";

        public DesignReviewRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public DesignReview DashboardGetById(Guid id)
        {
            return DbSet
                .Where(e => e.Id == id)
                .SingleOrDefault();
        }

        public DesignReview GetOwnById(Guid id, string userId)
        {
            return DbSet
                .Where(e => e.Id == id && e.Project.Account.SkyberryUsers.Any(u=>u.Id == userId))
                .SingleOrDefault();
        }

        public override DesignReview GetById(object id)
        {
            DesignReview query = DbSet.Where(e => e.Id == (Guid)id)
                .Include(e => e.Project)
                .Include("Project.Account")
                .Include(e => e.ReviewComments)
                .Include(e => e.ReviewDocuments)
                .Include(e => e.SelectedReviewDocument)
                .Select(e => e).SingleOrDefault();

            return query;
        }

        public override List<DesignReview> GetAll()
        {
            List<DesignReview> query = DbSet.Select(e => e).Include(e => e.Project).Include("Project.Account").OrderBy(e => e.Project.Account.Name).ThenBy(e => e.Project.Name).ThenBy(e => e.Title).ToList();

            return query;
        }

        public IPagedList<DesignReview> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet.Include(e => e.Project).Include("Project.Account") as IOrderedQueryable<DesignReview>;
            var sorted = LinqExtensions.ApplySortingPaging<DesignReview>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<DesignReview> GetAllPaged(PageSortCriteria pageSortCriteria, DesignReviewSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<DesignReview, DesignReviewSearchCriteria>(searchCriteria);
            var filtered = DbSet.Include(e => e.Project).Include("Project.Account").Where(predicate) as IOrderedQueryable<DesignReview>;
            var sorted = LinqExtensions.ApplySortingPaging<DesignReview>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<DesignReview> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }
    }

    public class DesignReviewSearchCriteria
    {
        public string Title { get; set; }
        public string Description { get; set; }

    }
}
