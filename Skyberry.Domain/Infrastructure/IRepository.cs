using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Skyberry.Domain
{
    public interface IRepository<T> : IDisposable where T : class
    {

        List<T> GetAll();
        T GetById(object id);
        void Add(T entity);
        void Delete(T entity);
        void Update(T entity);
        void SaveChanges();

        List<T> GetSetByIds(List<Guid> ids);

        //void Attach(T entity);
        //DbEntityEntry<T> Entry(T entity);

        //T GetByKey(object keyValue);
    }
}
