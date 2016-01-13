using PagedList;
using Skyberry.Domain.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Skyberry.Domain
{
    public interface IDocumentRepository : IRepository<Document>
    {
        List<Guid> GetAllIds();
    }

    public class DocumentRepository : RepositoryBase<Document>, IDocumentRepository
    {
        public DocumentRepository(SkyberryContext context, ICacheProvider cache)
            : base(context, cache)
        {
        }

        public List<Guid> GetAllIds()
        {
            List<Guid> query = DbSet.Select(e => e.Id).ToList();

            return query;
        }

        public override List<Document> GetSetByIds(List<Guid> ids)
        {
            var query = DbSet.Where(e => ids.Contains(e.Id)).Select(e => e).ToList();

            return query;
        }
    }
}
