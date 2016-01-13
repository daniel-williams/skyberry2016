using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using PagedList;
using System;
using Skyberry.Domain.Linq;

namespace Skyberry.Domain
{
    public interface IProjectDocumentRepository : IRepository<ProjectDocument>
    {
        IPagedList<ProjectDocument> GetAllPaged(PageSortCriteria pageSortCriteria);
        IPagedList<ProjectDocument> GetAllPaged(PageSortCriteria pageSortCriteria, ProjectDocumentSearchCriteria searchCriteria);
    }

    public class ProjectDocumentRepository : RepositoryBase<ProjectDocument>, IProjectDocumentRepository
    {
        string DEFAULT_SORT = "FilenameOriginal";

        public ProjectDocumentRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public override ProjectDocument GetById(object id)
        {
            ProjectDocument query = DbSet.Where(e => e.Id == (Guid)id).Select(e => e).Include(e=>e.Project).Include("Project.Account").SingleOrDefault();

            return query;
        }

        public override List<ProjectDocument> GetAll()
        {
            List<ProjectDocument> query = DbSet.Include(e => e.Project).Include("Project.Account").Select(e => e).ToList();

            return query;
        }

        public IPagedList<ProjectDocument> GetAllPaged(PageSortCriteria pageSortCriteria)
        {
            var dbSet = DbSet.Include(e => e.Project).Include("Project.Account") as IOrderedQueryable<ProjectDocument>;
            var sorted = LinqExtensions.ApplySortingPaging<ProjectDocument>(dbSet, pageSortCriteria, DEFAULT_SORT);

            return sorted.ToPagedList(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        public IPagedList<ProjectDocument> GetAllPaged(PageSortCriteria pageSortCriteria, ProjectDocumentSearchCriteria searchCriteria)
        {
            var predicate = LinqExtensions.BuildPredicate<ProjectDocument, ProjectDocumentSearchCriteria>(searchCriteria);
            var filtered = DbSet.Include(e => e.Project).Include("Project.Account").Where(predicate) as IOrderedQueryable<ProjectDocument>;
            var sorted = LinqExtensions.ApplySortingPaging<ProjectDocument>(filtered, pageSortCriteria, DEFAULT_SORT);

            return sorted;
        }

        public override List<ProjectDocument> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }
    }

    public class ProjectDocumentSearchCriteria
    {
        [FieldMap("FilenameOriginal")]
        public string Filename { get; set; }
        public string Title { get; set; }
        public string Version { get; set; }
    }
}
