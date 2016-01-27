using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface IProjectRepository : IRepository<Project>
    {
        IPagedList<Project> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Project> GetAllPaged(PageSortCriteria pageSortCriteria, ProjectSearchCriteria searchCriteria);

        List<Project> GetByAccount(Guid accountId);

        Project GetProjectById(Guid projectId);
        Project GetOwnById(string userId, Guid projectId);
    }

    public class ProjectRepository : RepositoryBase<Project>, IProjectRepository
    {
        string DEFAULT_SORT = "Name";

        public ProjectRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override Project GetById(object id)
        {
            Project query = DbSet.Where(e => e.Id == (Guid)id)
                .Select(e => e)
                .Include(e => e.Account)
                .Include(e=>e.ProjectDocuments)
                .SingleOrDefault();

            return query;
        }

        public Project GetProjectById(Guid projectId)
        {
            Project query = DbSet
                .Where(e => e.Id == projectId)
                .Select(e => e)
                .Include(e => e.Contracts)
                .Include("Contracts.ContractDocuments")
                .Include(e => e.ProjectDocuments)
                .Include(e => e.DesignReviews)
                .Include("DesignReviews.ReviewComments")
                .Include("DesignReviews.ReviewDocuments")
                .SingleOrDefault();

            return query;
        }

        public override List<Project> GetAll()
        {
            List<Project> query = DbSet
                .Include(e => e.Account)
                .OrderBy(e => e.Account.Name)
                .ThenBy(e => e.Name)
                .ToList();

            return query;
        }

        public IPagedList<Project> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet.Include(e => e.Account) as IOrderedQueryable<Project>;
            var sorted = LinqExtensions.ApplySortingPaging<Project>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Project> GetAllPaged(PageSortCriteria pageSortCriteria, ProjectSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Project, ProjectSearchCriteria>(searchCriteria);
            var filtered = DbSet.Include(e => e.Account).Where(predicate) as IOrderedQueryable<Project>;
            var sorted = LinqExtensions.ApplySortingPaging<Project>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<Project> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet
                .Where(e => ids.Contains(e.Id))
                .Select(e => e)
                .Include(e => e.Account)
                .ToList();

            return query;
        }

        public List<Project> GetByAccount(Guid accountId)
        {
            List<Project> query = DbSet
                .Where(e => e.AccountId == accountId)
                .Select(e => e)
                .Include(e => e.DesignReviews)
                .Include("DesignReviews.ReviewDocuments")
                .Include(e => e.Contracts)
                .Include("Contracts.ContractDocuments")
                .Include(e => e.ProjectDocuments)
                .ToList();

            return query;
        }

        public Project GetOwnById(string userId, Guid projectId)
        {
            return DbSet
                .Where(e => e.Id == projectId && e.Account.SkyberryUsers.Any(u => u.Id == userId))
                .SingleOrDefault();
        }
    }

    public class ProjectSearchCriteria
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}