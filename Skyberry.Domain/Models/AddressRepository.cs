using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface IAddressRepository : IRepository<Address>
    {
        IPagedList<Address> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Address> GetAllPaged(PageSortCriteria pageSortCriteria, AddressSearchCriteria searchCriteria);
    }

    public class AddressRepository : RepositoryBase<Address>, IAddressRepository
    {
        string DEFAULT_SORT = "AddressType";

        public AddressRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override Address GetById(object id)
        {
            Address query = DbSet.Where(e => e.AddressId == (Guid)id).Select(e => e).Include(e => e.SkyberryUsers).Include(e => e.Accounts).SingleOrDefault();

            return query;
        }

        public override List<Address> GetAll()
        {
            List<Address> query = DbSet.Select(e => e).ToList();

            return query;
        }

        public IPagedList<Address> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet as IOrderedQueryable<Address>;
            var sorted = LinqExtensions.ApplySortingPaging<Address>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Address> GetAllPaged(PageSortCriteria pageSortCriteria, AddressSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Address, AddressSearchCriteria>(searchCriteria);
            var filtered = DbSet.Where(predicate) as IOrderedQueryable<Address>;
            var sorted = LinqExtensions.ApplySortingPaging<Address>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<Address> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.AddressId)).Select(e => e).ToList();

            return query;
        }
    }

    public class AddressSearchCriteria
    {
        public string AddressType { get; set; }
        public string Locality { get; set; }
        public string Region { get; set; }
    }
}
