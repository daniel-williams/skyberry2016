using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface ISkyberryUserRepository : IRepository<SkyberryUser>
    {
        IPagedList<SkyberryUser> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<SkyberryUser> GetAllPaged(PageSortCriteria pageSortCriteria, UserSearchCriteria searchCriteria);

        SkyberryUser GetUserInfo(string userId);
        SkyberryUser GetDashboardInfo(string userId);
    }

    public class SkyberryUserRepository : RepositoryBase<SkyberryUser>, ISkyberryUserRepository
    {
        string DEFAULT_SORT = "LastName";

        public SkyberryUserRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override SkyberryUser GetById(object id)
        {
            SkyberryUser query = DbSet.Where(e => e.Id == (string)id).Select(e => e).Include(e => e.Addresses).Include(e => e.Contacts).Include(e => e.Accounts).FirstOrDefault();

            return query;
        }

        public IPagedList<SkyberryUser> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet as IOrderedQueryable<SkyberryUser>;
            var sorted = LinqExtensions.ApplySortingPaging<SkyberryUser>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<SkyberryUser> GetAllPaged(PageSortCriteria pageSortCriteria, UserSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<SkyberryUser, UserSearchCriteria>(searchCriteria);
            var filtered = DbSet.Where(predicate) as IOrderedQueryable<SkyberryUser>;
            var sorted = LinqExtensions.ApplySortingPaging<SkyberryUser>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<SkyberryUser> GetSetByIds(List<Guid> ids)
        {
            var sIds = ids.Select(e => e.ToString()).ToList();

            var query = DbSet.Where(e => sIds.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }

        public SkyberryUser GetDashboardInfo(string userId)
        {
            return DbSet.Where(e => e.Id == userId)
                .Include(e => e.Contacts)
                .First();
        }


        public SkyberryUser GetUserInfo(string userId)
        {
            return DbSet.Where(e => e.Id == userId)
                .Select(e => e)
                .First();
        }
    }

    public class UserSearchCriteria
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}