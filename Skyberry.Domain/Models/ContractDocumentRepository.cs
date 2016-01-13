using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using PagedList;
using System;
using Skyberry.Domain.Linq;

namespace Skyberry.Domain
{
    public interface IContractDocumentRepository : IRepository<ContractDocument>
    {
        IPagedList<ContractDocument> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<ContractDocument> GetAllPaged(PageSortCriteria pageSortCriteria, ContractDocumentSearchCriteria searchCriteria);
    }

    public class ContractDocumentRepository : RepositoryBase<ContractDocument>, IContractDocumentRepository
    {
        string DEFAULT_SORT = "FilenameOriginal";

        public ContractDocumentRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override ContractDocument GetById(object id)
        {
            ContractDocument query = DbSet.Where(e => e.Id == (Guid)id).Select(e => e).SingleOrDefault();

            return query;
        }

        public override List<ContractDocument> GetAll()
        {
            List<ContractDocument> query = DbSet.Select(e => e).ToList();

            return query;
        }

        public IPagedList<ContractDocument> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet as IOrderedQueryable<ContractDocument>;
            var sorted = LinqExtensions.ApplySortingPaging<ContractDocument>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<ContractDocument> GetAllPaged(PageSortCriteria pageSortCriteria, ContractDocumentSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<ContractDocument, ContractDocumentSearchCriteria>(searchCriteria);
            var filtered = DbSet.Where(predicate) as IOrderedQueryable<ContractDocument>;
            var sorted = LinqExtensions.ApplySortingPaging<ContractDocument>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<ContractDocument> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }
    }

    public class ContractDocumentSearchCriteria
    {
        [FieldMap("FilenameOriginal")]
        public string Filename { get; set; }
        public string Title { get; set; }
        public string Version { get; set; }
    }
}
