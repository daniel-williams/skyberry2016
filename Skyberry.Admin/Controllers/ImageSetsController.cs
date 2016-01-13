using System;
using System.Linq;
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
    public class ImageSetsController : _BaseController
    {
        public ImageSetsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Name")] ImageSetSearchCriteria searchCriteria = null)
        {
            ImageSetListVM vm = new ImageSetListVM
            {
                ImageSets = UOW.ImageSets.GetAllPaged(pageSortCriteria, searchCriteria),
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
            ImageSet imageSet = UOW.ImageSets.GetById(id);
            if (imageSet == null)
            {
                return HttpNotFound();
            }
            ImageSetVM vm = new ImageSetVM
            {
                ImageSet = imageSet
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            ImageSetVM vm = new ImageSetVM
            {
                Images = UOW.Images.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "ImageSet")] ImageSet imageSet, [Bind(Include = "Images")] List<Guid> images)
        {
            if (ModelState.IsValid)
            {
                if (images != null)
                {
                    ImageSet newImageSet = new ImageSet();
                    newImageSet.ImageSetId = Guid.NewGuid();
                    newImageSet.Name = imageSet.Name;
                    newImageSet.ImageId = imageSet.ImageId;

                    //UOW.ImageSetItems.DeleteByImageSetId(newImageSet.ImageSetId);

                    List<ImageSetItem> newItemSet = new List<ImageSetItem>();
                    byte pos = 1;
                    foreach (Guid item in images)
                    {
                        newItemSet.Add(new ImageSetItem
                        {
                            ImageSetItemId = Guid.NewGuid(),
                            ImageId = item,
                            Position = pos++,
                            ImageSetId = newImageSet.ImageSetId
                        });
                    }

                    newImageSet.ImageSetItems = newItemSet;

                    UOW.ImageSets.Add(newImageSet);
                    UOW.Commit();

                    imageSet = newImageSet;
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "ImageSet must be associated with one or more set images.");
                }
            }
            ImageSetVM vm = new ImageSetVM
            {
                ImageSet = imageSet,
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
            ImageSet imageSet = UOW.ImageSets.GetById(id);
            if (imageSet == null)
            {
                return HttpNotFound();
            }
            ImageSetVM vm = new ImageSetVM
            {
                ImageSet = imageSet,
                Images = UOW.Images.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "ImageSet")] ImageSet imageSet, [Bind(Include = "Images")] List<Guid> images)
        {
            ImageSet dbImageSet = UOW.ImageSets.GetById(imageSet.ImageSetId);
            if (dbImageSet != null)
            {
                if(images != null)
                {
                    dbImageSet.Name = imageSet.Name;
                    dbImageSet.ImageId = imageSet.ImageId;

                    var items = UOW.ImageSetItems.GetByImageSetId(imageSet.ImageSetId);
                    foreach (var item in items)
                    {
                        UOW.ImageSetItems.Delete(item);
                    }

                    List<ImageSetItem> newItemSet = new List<ImageSetItem>();
                    byte pos = 1;
                    foreach (Guid item in images)
                    {
                        newItemSet.Add(new ImageSetItem
                        {
                            ImageSetItemId = Guid.NewGuid(),
                            ImageId = item,
                            Position = pos++,
                            ImageSetId = dbImageSet.ImageSetId
                        });
                    }

                    dbImageSet.ImageSetItems = newItemSet;

                    UOW.Commit();
                    imageSet = dbImageSet;
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "ImageSet must be associated with one or more set images.");
                }
            }
            else
            {
                return HttpNotFound();
            }

            ImageSetVM vm = new ImageSetVM
            {
                ImageSet = imageSet,
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
            ImageSet imageSet = UOW.ImageSets.GetById(id);
            if (imageSet == null)
            {
                return HttpNotFound();
            }
            ImageSetVM vm = new ImageSetVM
            {
                ImageSet = imageSet
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            ImageSet imageSet = UOW.ImageSets.GetById(id);
            if (imageSet == null)
            {
                return HttpNotFound();
            }
            var items = UOW.ImageSetItems.GetByImageSetId(imageSet.ImageSetId);
            foreach (var item in items)
            {
                UOW.ImageSetItems.Delete(item);
            }
            UOW.ImageSets.Delete(imageSet);
            UOW.Commit();
            return RedirectToAction("Index");
        }


        

    }
}
