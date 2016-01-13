using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface IAccoladeRepository : IRepository<Accolade>
    {
        IPagedList<Accolade> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<Accolade> GetAllPaged(PageSortCriteria pageSortCriteria, AccoladeSearchCriteria searchCriteria);
    }

    public class AccoladeRepository : RepositoryBase<Accolade>, IAccoladeRepository
    {
        string DEFAULT_SORT = "Title";

        public AccoladeRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override Accolade GetById(object id)
        {
            Accolade query = DbSet.Where(e => e.AccoladeId == (Guid)id).Select(e => e).Include("Account").Include("ImageSets").Include("ImageSets.Image").FirstOrDefault();

            return query;
        }

        public override List<Accolade> GetAll()
        {
            List<Accolade> query = DbSet.Select(e => e).OrderBy(m => m.Title).ToList();

            return query;
        }

        public IPagedList<Accolade> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet.Include("Account") as IOrderedQueryable<Accolade>;
            var sorted = LinqExtensions.ApplySortingPaging<Accolade>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<Accolade> GetAllPaged(PageSortCriteria pageSortCriteria, AccoladeSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<Accolade, AccoladeSearchCriteria>(searchCriteria);
            var filtered = DbSet.Include("Account").Where(predicate) as IOrderedQueryable<Accolade>;
            var sorted = LinqExtensions.ApplySortingPaging<Accolade>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<Accolade> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.AccoladeId)).Select(e => e).ToList();

            return query;
        }
    }

    public class AccoladeSearchCriteria
    {
        public string Title { get; set; }
    }
}
