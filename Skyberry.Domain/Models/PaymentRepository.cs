using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface IPaymentRepository : IRepository<Payment>
    {
        IPagedList<Payment> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Payment> GetAllPaged(PageSortCriteria pageSortCriteria, PaymentSearchCriteria searchCriteria);
    }

    public class PaymentRepository : RepositoryBase<Payment>, IPaymentRepository
    {
        string DEFAULT_SORT = "Account.Name";

        public PaymentRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override Payment GetById(object id)
        {
            Payment query = DbSet.Where(e => e.Id == (Guid)id).Select(e => e).Include(e => e.Account).SingleOrDefault();

            return query;
        }

        public override List<Payment> GetAll()
        {
            List<Payment> query = DbSet.Select(e => e).OrderByDescending(e => e.PaymentDate).Include(e => e.Account).ToList();

            return query;
        }

        public IPagedList<Payment> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet.Include(e => e.Account) as IOrderedQueryable<Payment>;
            var sorted = LinqExtensions.ApplySortingPaging<Payment>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Payment> GetAllPaged(PageSortCriteria pageSortCriteria, PaymentSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Payment, PaymentSearchCriteria>(searchCriteria);
            var filtered = DbSet.Include(e => e.Account).Where(predicate) as IOrderedQueryable<Payment>;
            var sorted = LinqExtensions.ApplySortingPaging<Payment>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<Payment> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }
    }

    public class PaymentSearchCriteria
    {
        public string Amount { get; set; }
        public string PaymentType { get; set; }
    }
}
