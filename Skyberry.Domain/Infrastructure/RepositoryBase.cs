using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Core.Metadata.Edm;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace Skyberry.Domain
{
    public abstract class RepositoryBase<T> : IRepository<T> where T : class
    {
        public RepositoryBase(SkyberryContext context, ICacheProvider cache)
        {
            _context = context;
            _dbSet = _context.Set<T>();
            _cache = cache;
        }

        private ICacheProvider _cache;
        public ICacheProvider Cache
        {
            get { return _cache; }
        }

        private SkyberryContext _context;
        public SkyberryContext Context
        {
            get { return _context; }
        }

        private DbSet<T> _dbSet;
        public DbSet<T> DbSet
        {
            get { return _dbSet; }
        }

        public virtual List<T> GetAll()
        {
            List<T> query = DbSet.ToList();
            return query;
        }

        public virtual T GetById(object id)
        {
            T item = DbSet.Find(id);
            return item;
        }

        public abstract List<T> GetSetByIds(List<Guid> ids);

        public virtual void Add(T entity)
        {
            DbSet.Add(entity);
        }

        public virtual void Delete(T entity)
        {
            DbSet.Remove(entity);
        }

        public virtual void Update(T entity)
        {

            Context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        }

        public virtual void SaveChanges()
        {
            Context.SaveChanges();
        }

        #region GetByKey (commented out)
        //public T GetByKey(object keyValue)
        //{
        //    EntityKey key = GetEntityKey(keyValue);

        //    object originalItem;
        //    if (((IObjectContextAdapter)context).ObjectContext.TryGetObjectByKey(key, out originalItem))
        //    {
        //        return (T)originalItem;
        //    }
        //    return default(T);
        //}

        //private ObjectContext _objectContext;
        //private ObjectContext ObjectContext
        //{
        //    get
        //    {
        //        return this._objectContext;
        //    }
        //}

        //private EntityKey GetEntityKey(object keyValue)
        //{
        //    var entitySetName = GetEntityName<T>();
        //    var objectSet = ((IObjectContextAdapter)context).ObjectContext.CreateObjectSet<T>();
        //    var keyPropertyName = objectSet.EntitySet.ElementType.KeyMembers[0].ToString();
        //    var entityKey = new EntityKey(entitySetName, new[] { new EntityKeyMember(keyPropertyName, keyValue) });
        //    return entityKey;
        //}

        //private string GetEntityName<TEntity>() where TEntity : class
        //{
        //    // PluralizationService pluralizer = PluralizationService.CreateService(CultureInfo.GetCultureInfo("en"));
        //    // return string.Format("{0}.{1}", ((IObjectContextAdapter)DbContext).ObjectContext.DefaultContainerName, pluralizer.Pluralize(typeof(TEntity).Name));

        //    // Thanks to Kamyar Paykhan -  http://huyrua.wordpress.com/2011/04/13/entity-framework-4-poco-repository-and-specification-pattern-upgraded-to-ef-4-1/#comment-688
        //    string entitySetName = ((IObjectContextAdapter)context).ObjectContext
        //        .MetadataWorkspace
        //        .GetEntityContainer(((IObjectContextAdapter)context).ObjectContext.DefaultContainerName, DataSpace.CSpace)
        //                            .BaseEntitySets.Where(bes => bes.ElementType.Name == typeof(TEntity).Name).First().Name;
        //    return string.Format("{0}.{1}", ((IObjectContextAdapter)context).ObjectContext.DefaultContainerName, entitySetName);
        //}
        #endregion

        #region IDispoable
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    Context.Dispose();
                }
            }

            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
