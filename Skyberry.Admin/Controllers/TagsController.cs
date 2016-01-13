using System;
using System.Net;
using System.Web.Mvc;
using Skyberry.Domain;
using Skyberry.Domain.Linq;
using Skyberry.Admin.ViewModels;
using System.Collections.Generic;

namespace Skyberry.Admin.Controllers
{
    [RequireHttps]
    [Authorize(Roles = "Admin")]
    public class TagsController : _BaseController
    {
        public TagsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Name")] TagSearchCriteria searchCriteria = null)
        {
            TagListVM vm = new TagListVM
            {
                Tags = UOW.Tags.GetAllPaged(pageSortCriteria, searchCriteria),
                PageSortCriteria = pageSortCriteria,
                SearchCriteria = searchCriteria
            };
            return View(vm);
        }

        public ActionResult Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tag tag = UOW.Tags.GetById(id);
            if (tag == null)
            {
                return HttpNotFound();
            }
            TagVM vm = new TagVM
            {
                Tag = tag
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            TagVM vm = new TagVM
            {
                Images = UOW.Images.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "Tag")] Tag tag, [Bind(Include = "Images")] List<Guid> images)
        {
            if (ModelState.IsValid)
            {
                Tag newTag = new Tag();
                newTag.TagId = Guid.NewGuid();
                newTag.Name = tag.Name;
                newTag.IsActive = tag.IsActive;
                newTag.IsFilter = tag.IsFilter;

                if (images != null)
                {
                    newTag.Images = UOW.Images.GetSetByIds(images);
                }

                UOW.Tags.Add(newTag);
                UOW.Commit();

                tag = newTag;
            }
            TagVM vm = new TagVM
            {
                Tag = tag,
                Images = UOW.Images.GetAll()
            };
            return View("Edit", vm);
        }

        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tag tag = UOW.Tags.GetById(id);
            if (tag == null)
            {
                return HttpNotFound();
            }
            TagVM vm = new TagVM
            {
                Tag = tag,
                Images = UOW.Images.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix="Tag")] Tag tag, [Bind(Include="Images")] List<Guid> images)
        {
            Tag dbTag = UOW.Tags.GetById(tag.TagId);
            if (dbTag != null)
            {
                dbTag.Name = tag.Name;
                dbTag.IsActive = tag.IsActive;
                dbTag.IsFilter = tag.IsFilter;

                dbTag.Images.Clear();
                if(images != null)
                {
                    dbTag.Images = UOW.Images.GetSetByIds(images);
                }

                UOW.Commit();
                tag = dbTag;
            }
            else
            {
                return HttpNotFound();
            }

            TagVM vm = new TagVM
            {
                Tag = tag,
                Images = UOW.Images.GetAll()
            };
            return View(vm);
        }

        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tag tag = UOW.Tags.GetById(id);
            if (tag == null)
            {
                return HttpNotFound();
            }
            TagVM vm = new TagVM
            {
                Tag = tag
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Tag tag = UOW.Tags.GetById(id);
            if (tag == null)
            {
                return HttpNotFound();
            }
            UOW.Tags.Delete(tag);
            UOW.Commit();
            return RedirectToAction("Index");
        }


        

    }
}
