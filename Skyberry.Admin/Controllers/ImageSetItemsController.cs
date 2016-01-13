using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Skyberry.Domain;
using Skyberry.Admin.ViewModels;
using System.Collections.Generic;
using Skyberry.Domain.Linq;

namespace Skyberry.Admin.Controllers
{
    [RequireHttps]
    [Authorize(Roles = "Admin")]
    public class ImageSetItemsController : _BaseController
    {
        public ImageSetItemsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Position")] ImageSetItemSearchCriteria searchCriteria = null)
        {
            ImageSetItemListVM vm = new ImageSetItemListVM
            {
                ImageSetItems = UOW.ImageSetItems.GetAllPaged(pageSortCriteria, searchCriteria),
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
            ImageSetItem imageSetItem = UOW.ImageSetItems.GetById(id);
            if (imageSetItem == null)
            {
                return HttpNotFound();
            }
            ImageSetItemVM vm = new ImageSetItemVM
            {
                ImageSetItem = imageSetItem
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            ImageSetItemVM vm = new ImageSetItemVM
            {
                ImageSets = UOW.ImageSets.GetAll(),
                Images = UOW.Images.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "ImageSetItem")] ImageSetItem imageSetItem)
        {
            if (ModelState.IsValid)
            {
                ImageSetItem newImageSetItem = new ImageSetItem();
                newImageSetItem.ImageSetItemId = Guid.NewGuid();
                newImageSetItem.ImageSetId = imageSetItem.ImageSetId;
                newImageSetItem.ImageId = imageSetItem.ImageId;                
                newImageSetItem.Position = imageSetItem.Position;

                UOW.ImageSetItems.Add(newImageSetItem);
                UOW.Commit();
                imageSetItem = newImageSetItem;

            }
            ImageSetItemVM vm = new ImageSetItemVM
            {
                ImageSetItem = imageSetItem,
                ImageSets = UOW.ImageSets.GetAll(),
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
            ImageSetItem imageSetItem = UOW.ImageSetItems.GetById(id);
            if (imageSetItem == null)
            {
                return HttpNotFound();
            }
            ImageSetItemVM vm = new ImageSetItemVM
            {
                ImageSetItem = imageSetItem,
                ImageSets = UOW.ImageSets.GetAll(),
                Images = UOW.Images.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "ImageSetItem")] ImageSetItem imageSetItem)
        {
            ImageSetItem dbImageSetItem = UOW.ImageSetItems.GetById(imageSetItem.ImageSetItemId);
            if (dbImageSetItem != null)
            {
                dbImageSetItem.ImageSetId = imageSetItem.ImageSetId;
                dbImageSetItem.ImageId = imageSetItem.ImageId;
                dbImageSetItem.Position = imageSetItem.Position;

                UOW.Commit();
                imageSetItem = dbImageSetItem;
            }
            else
            {
                return HttpNotFound();
            }
            ImageSetItemVM vm = new ImageSetItemVM
            {
                ImageSetItem = imageSetItem,
                ImageSets = UOW.ImageSets.GetAll(),
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
            ImageSetItem imageSetItem = UOW.ImageSetItems.GetById(id);
            if (imageSetItem == null)
            {
                return HttpNotFound();
            }
            ImageSetItemVM vm = new ImageSetItemVM
            {
                ImageSetItem = imageSetItem
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            ImageSetItem imageSetItem = UOW.ImageSetItems.GetById(id);
            if (imageSetItem == null)
            {
                return HttpNotFound();
            }
            UOW.ImageSetItems.Delete(imageSetItem);
            UOW.Commit();
            return RedirectToAction("Index");
        }
    }
}
