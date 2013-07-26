using BookMyRoom.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookMyRoom.Controllers.API
{
    public class BaseApiController<TEntity> : ApiController
        where TEntity : class, new()
    {
        protected readonly bookmyroomEntities _dbContext;

        public BaseApiController()
        {
            _dbContext = new bookmyroomEntities();
        }

        // GET api/base
        public virtual IEnumerable<TEntity> Get()
        {
            return _dbContext.Set<TEntity>();
        }

        // GET api/base/5
        public virtual TEntity Get(int id)
        {
            TEntity _entity = _dbContext.Set<TEntity>().Find(id);
            if (_entity == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return _entity;
        }

        // POST api/base
        public virtual HttpResponseMessage Post(TEntity entity)
        {
            if (ModelState.IsValid)
            {
                _dbContext.Set<TEntity>().Add(entity);
                _dbContext.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, entity);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { record = entity }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        public virtual HttpResponseMessage Put(int id, TEntity entity)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            _dbContext.Entry<TEntity>(entity).State = System.Data.EntityState.Modified;
            try
            {
                _dbContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public virtual HttpResponseMessage Delete(int id)
        {
            TEntity _entity = _dbContext.Set<TEntity>().Find(id);
            if (_entity == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            _dbContext.Set<TEntity>().Remove(_entity);

            try
            {
                _dbContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, _entity);
        }

        protected override void Dispose(bool disposing)
        {
            _dbContext.Dispose();
            base.Dispose(disposing);
        }
    }
}
