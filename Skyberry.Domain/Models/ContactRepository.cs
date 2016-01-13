using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface IContactRepository : IRepository<Contact>
    {
        IPagedList<Contact> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Contact> GetAllPaged(PageSortCriteria pageSortCriteria, ContactSearchCriteria searchCriteria);
    }

    public class ContactRepository : RepositoryBase<Contact>, IContactRepository
    {
        string DEFAULT_SORT = "ContactType";

        public ContactRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override Contact GetById(object id)
        {
            Contact query = DbSet.Where(e => e.Id == (Guid)id).Select(e => e).Include(e => e.SkyberryUsers).Include(e => e.Accounts).SingleOrDefault();

            return query;
        }

        public override List<Contact> GetAll()
        {
            List<Contact> query = DbSet.Select(e => e).ToList();

            return query;
        }

        public IPagedList<Contact> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet as IOrderedQueryable<Contact>;
            var sorted = LinqExtensions.ApplySortingPaging<Contact>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Contact> GetAllPaged(PageSortCriteria pageSortCriteria, ContactSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Contact, ContactSearchCriteria>(searchCriteria);
            var filtered = DbSet.Where(predicate) as IOrderedQueryable<Contact>;
            var sorted = LinqExtensions.ApplySortingPaging<Contact>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<Contact> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }
    }

    public class ContactSearchCriteria
    {
        public string ContactType { get; set; }
        public string ContactData { get; set; }
    }
}
