using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface IContractRepository : IRepository<Contract>
    {
        IPagedList<Contract> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Contract> GetAllPaged(PageSortCriteria pageSortCriteria, ContractSearchCriteria searchCriteria);
    }

    public class ContractRepository : RepositoryBase<Contract>, IContractRepository
    {
        string DEFAULT_SORT = "Title";

        public ContractRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override Contract GetById(object id)
        {
            Contract query = DbSet.Where(e => e.Id == (Guid)id).Select(e => e).Include(e => e.ContractDocuments).Include(e => e.Projects).SingleOrDefault();

            return query;
        }

        public override List<Contract> GetAll()
        {
            List<Contract> query = DbSet.Select(e => e).Include("Projects").Include("Projects.Account").ToList();

            // Ling to Entities doesn't support ordering by computed property (ContractName)
            // Sort using linq to objects after we pull the list
            query = query.OrderBy(e => e.AccountName).ThenBy(e => e.Title).ToList();

            return query;
        }

        public IPagedList<Contract> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet as IOrderedQueryable<Contract>;
            var sorted = LinqExtensions.ApplySortingPaging<Contract>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Contract> GetAllPaged(PageSortCriteria pageSortCriteria, ContractSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Contract, ContractSearchCriteria>(searchCriteria);
            var filtered = DbSet.Where(predicate) as IOrderedQueryable<Contract>;
            var sorted = LinqExtensions.ApplySortingPaging<Contract>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<Contract> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }
    }

    public class ContractSearchCriteria
    {
        public string Title { get; set; }
    }
}
