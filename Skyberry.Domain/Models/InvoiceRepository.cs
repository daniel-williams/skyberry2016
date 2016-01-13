using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface IInvoiceRepository : IRepository<Invoice>
    {
        IPagedList<Invoice> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Invoice> GetAllPaged(PageSortCriteria pageSortCriteria, InvoiceSearchCriteria searchCriteria);
    }

    public class InvoiceRepository : RepositoryBase<Invoice>, IInvoiceRepository
    {
        string DEFAULT_SORT = "Title";

        public InvoiceRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override Invoice GetById(object id)
        {
            Invoice query = DbSet.Where(e => e.Id == (Guid)id).Select(e => e).Include(e => e.Account).Include(e => e.Project).SingleOrDefault();

            return query;
        }

        public override List<Invoice> GetAll()
        {
            List<Invoice> query = DbSet.Select(e => e).Include(e => e.Account).Include(e => e.Project).OrderBy(e => e.Account.Name).ThenBy(e => e.Project.Name).ThenBy(e => e.InvoiceNumber).ToList();

            return query;
        }

        public IPagedList<Invoice> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet.Include(e => e.Account) as IOrderedQueryable<Invoice>;
            var sorted = LinqExtensions.ApplySortingPaging<Invoice>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Invoice> GetAllPaged(PageSortCriteria pageSortCriteria, InvoiceSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Invoice, InvoiceSearchCriteria>(searchCriteria);
            var filtered = DbSet.Include(e => e.Account).Where(predicate) as IOrderedQueryable<Invoice>;
            var sorted = LinqExtensions.ApplySortingPaging<Invoice>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<Invoice> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }
    }

    public class InvoiceSearchCriteria
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Version { get; set; }
    }
}
