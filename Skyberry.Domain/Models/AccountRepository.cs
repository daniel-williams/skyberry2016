using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface IAccountRepository : IRepository<Account>
    {
        IPagedList<Account> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Account> GetAllPaged(PageSortCriteria pageSortCriteria, AccountSearchCriteria searchCriteria);

        List<Account> GetByUserId(string userId);
        List<Project> GetProjects(Guid accountId);
        List<Project> GetOwnAccountProjects(string userId, Guid accountId);
    }

    public class AccountRepository : RepositoryBase<Account>, IAccountRepository
    {
        string DEFAULT_SORT = "Name";

        public AccountRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public List<Project> GetOwnAccountProjects(string userId, Guid accountId)
        {
            List<Project> projects = Context.Projects
                .Where(e => e.AccountId == accountId && e.Account.SkyberryUsers.Any(u => u.Id == userId))
                .ToList();
            return projects;
        }

        public List<Project> GetProjects(Guid accountId)
        {
            return Context.Projects.Where(e => e.AccountId == accountId).ToList();
        }

        public override Account GetById(object id)
        {
            Account query = DbSet.Where(e => e.Id == (Guid)id).Select(e => e).Include(e => e.SkyberryUsers).Include(e => e.Contacts).Include(e => e.Addresses).Include(e => e.Accolades).Include(e => e.Testimonials).Include(e => e.Invoices).Include(e => e.Payments).Include(e => e.Projects).FirstOrDefault();

            return query;
        }

        public override List<Account> GetAll()
        {
            List<Account> query = DbSet.Select(e => e).OrderBy(m => m.Name).ToList();

            return query;
        }

        public IPagedList<Account> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet as IOrderedQueryable<Account>;
            var sorted = LinqExtensions.ApplySortingPaging<Account>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Account> GetAllPaged(PageSortCriteria pageSortCriteria, AccountSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Account, AccountSearchCriteria>(searchCriteria);
            var filtered = DbSet.Where(predicate) as IOrderedQueryable<Account>;
            var sorted = LinqExtensions.ApplySortingPaging<Account>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<Account> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }


        public List<Account> GetByUserId(string userId)
        {
            var accounts = DbSet.Where(a => a.SkyberryUsers.Any(u => u.Id == userId)).Include(e => e.Projects).OrderBy(e => e.Name).ToList();
            return accounts;
        }

    }

    public class AccountSearchCriteria
    {
        public string Name { get; set; }
        public string IndustryType { get; set; }
    }
}
