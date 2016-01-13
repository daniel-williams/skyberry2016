using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface ICounterRepository : IRepository<Counter>
    {
        IPagedList<Counter> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Counter> GetAllPaged(PageSortCriteria pageSortCriteria, CounterSearchCriteria searchCriteria);

        Counter GetByName(string name);
    }

    public class CounterRepository : RepositoryBase<Counter>, ICounterRepository
    {
        string DEFAULT_SORT = "Name";

        public CounterRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override Counter GetById(object id)
        {
            Counter accolade = DbSet.Where(e => e.CounterId == (Guid)id).Select(e => e).FirstOrDefault();

            return accolade;
        }

        public override List<Counter> GetAll()
        {
            List<Counter> query = DbSet.Select(e => e).OrderBy(e => e.Name).ToList();

            return query;
        }

        public IPagedList<Counter> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var sorted = LinqExtensions.ApplySortingPaging<Counter>(DbSet as IOrderedQueryable<Counter>, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Counter> GetAllPaged(PageSortCriteria pageSortCriteria, CounterSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Counter, CounterSearchCriteria>(searchCriteria);
            var filtered = DbSet.Where(predicate) as IOrderedQueryable<Counter>;
            var sorted = LinqExtensions.ApplySortingPaging<Counter>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public Counter GetByName(string name)
        {
            Counter query = DbSet.Where(m => m.Name == name).Select(m => m).FirstOrDefault();

            return query;
        }

        public override List<Counter> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.CounterId)).Select(e => e).ToList();

            return query;
        }
    }

    public class CounterSearchCriteria
    {
        public string Name { get; set; }
    }
}
