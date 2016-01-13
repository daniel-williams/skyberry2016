using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;
using Skyberry.Domain;
using Skyberry.Admin.ViewModels;
using Skyberry.Domain.Linq;

namespace Skyberry.Admin.Controllers
{
    [RequireHttps]
    [Authorize(Roles = "Admin")]
    public class AccoladesController : _BaseController
    {
        public AccoladesController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Title")] AccoladeSearchCriteria searchCriteria = null)
        {
            AccoladeListVM vm = new AccoladeListVM
            {
                Accolades = UOW.Accolades.GetAllPaged(pageSortCriteria, searchCriteria),
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
            Accolade accolade = UOW.Accolades.GetById(id);
            if (accolade == null)
            {
                return HttpNotFound();
            }
            AccoladeVM vm = new AccoladeVM
            {
                Accolade = accolade
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            AccoladeVM vm = new AccoladeVM
            {
                ImageSets = UOW.ImageSets.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix="Accolade")] Accolade accolade, [Bind(Include="ImageSets")] List<Guid> imageSets)
        {
            if (ModelState.IsValid)
            {
                Accolade newAccolade = new Accolade();
                newAccolade.AccoladeId = Guid.NewGuid();
                newAccolade.Title = accolade.Title;
                newAccolade.Description = accolade.Description;
                newAccolade.IsActive = accolade.IsActive;
                newAccolade.AccountId = accolade.AccountId;

                newAccolade.ImageSets.Clear();
                if(imageSets != null)
                {
                    newAccolade.ImageSets = UOW.ImageSets.GetSetByIds(imageSets);
                }

                UOW.Accolades.Add(newAccolade);
                UOW.Commit();

                accolade = newAccolade;
            }

            AccoladeVM vm = new AccoladeVM
            {
                Accolade = accolade,
                ImageSets = UOW.ImageSets.GetAll()
            };
            return View("Edit", vm);
        }

        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Accolade accolade = UOW.Accolades.GetById(id);
            if (accolade == null)
            {
                return HttpNotFound();
            }
            AccoladeVM vm = new AccoladeVM
            {
                Accolade = accolade,
                ImageSets = UOW.ImageSets.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "Accolade")] Accolade accolade, [Bind(Include = "ImageSets")] List<Guid> imageSets)
        {
            Accolade dbAccolade = UOW.Accolades.GetById(accolade.AccoladeId);
            if(dbAccolade != null)
            {
                dbAccolade.Title = accolade.Title;
                dbAccolade.Description = accolade.Description;
                dbAccolade.IsActive = accolade.IsActive;
                dbAccolade.AccountId = accolade.AccountId;

                dbAccolade.ImageSets.Clear();
                if (imageSets != null)
                {
                    dbAccolade.ImageSets = UOW.ImageSets.GetSetByIds(imageSets);
                }

                UOW.Commit();
                accolade = dbAccolade;
            }
            else
            {
                return HttpNotFound();
            }

            AccoladeVM vm = new AccoladeVM
            {
                Accolade = accolade,
                ImageSets = UOW.ImageSets.GetAll()
            };
            return View(vm);
        }

        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Accolade accolade = UOW.Accolades.GetById(id);
            if (accolade == null)
            {
                return HttpNotFound();
            }
            AccoladeVM vm = new AccoladeVM
            {
                Accolade = accolade
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Accolade accolade = UOW.Accolades.GetById(id);
            if (accolade == null)
            {
                return HttpNotFound();
            }
            UOW.Accolades.Delete(accolade);
            UOW.Commit();
            return RedirectToAction("Index");
        }

    }
}
