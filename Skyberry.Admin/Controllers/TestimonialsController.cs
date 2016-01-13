using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Skyberry.Domain;
using Skyberry.Admin.ViewModels;
using Skyberry.Domain.Linq;

namespace Skyberry.Admin.Controllers
{
    [RequireHttps]
    [Authorize(Roles = "Admin")]
    public class TestimonialsController : _BaseController
    {
        public TestimonialsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Title, Description")] TestimonialSearchCriteria searchCriteria = null)
        {
            TestimonialListVM vm = new TestimonialListVM
            {
                Testimonials = UOW.Testimonials.GetAllPaged(pageSortCriteria, searchCriteria),
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
            Testimonial testimonial = UOW.Testimonials.GetById(id);
            if (testimonial == null)
            {
                return HttpNotFound();
            }
            TestimonialVM vm = new TestimonialVM
            {
                Testimonial = testimonial,
                Accounts = UOW.Accounts.GetAll()
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            TestimonialVM vm = new TestimonialVM
            {
                Accounts = UOW.Accounts.GetAll(),
                ImageSets = UOW.ImageSets.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "Testimonial")] Testimonial testimonial, [Bind(Include = "ImageSets")] List<Guid> imageSets)
        {
            if (ModelState.IsValid)
            {
                Testimonial newTestimonial = new Testimonial();
                newTestimonial.TestimonialId = Guid.NewGuid();
                newTestimonial.Title = testimonial.Title;
                newTestimonial.Description = testimonial.Description;
                newTestimonial.IsFeatured = testimonial.IsFeatured;
                newTestimonial.IsActive = testimonial.IsActive;
                newTestimonial.AccountId = testimonial.AccountId;

                newTestimonial.ImageSets.Clear();
                if (imageSets != null)
                {
                    newTestimonial.ImageSets = UOW.ImageSets.GetSetByIds(imageSets);
                }

                UOW.Testimonials.Add(newTestimonial);
                UOW.Commit();

                testimonial = newTestimonial;
            }

            TestimonialVM vm = new TestimonialVM
            {
                Testimonial = testimonial,
                Accounts = UOW.Accounts.GetAll(),
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
            Testimonial testimonial = UOW.Testimonials.GetById(id);
            if (testimonial == null)
            {
                return HttpNotFound();
            }
            TestimonialVM vm = new TestimonialVM
            {
                Testimonial = testimonial,
                Accounts = UOW.Accounts.GetAll(),
                ImageSets = UOW.ImageSets.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "Testimonial")] Testimonial testimonial, [Bind(Include = "ImageSets")] List<Guid> imageSets)
        {
            Testimonial dbTestimonial = UOW.Testimonials.GetById(testimonial.TestimonialId);
            if (dbTestimonial != null)
            {
                dbTestimonial.Title = testimonial.Title;
                dbTestimonial.Description = testimonial.Description;
                dbTestimonial.IsFeatured = testimonial.IsFeatured;
                dbTestimonial.IsActive = testimonial.IsActive;
                dbTestimonial.AccountId = testimonial.AccountId;

                dbTestimonial.ImageSets.Clear();
                if (imageSets != null)
                {
                    dbTestimonial.ImageSets = UOW.ImageSets.GetSetByIds(imageSets);
                }

                UOW.Commit();
                testimonial = dbTestimonial;
            }
            else
            {
                return HttpNotFound();
            }

            TestimonialVM vm = new TestimonialVM
            {
                Testimonial = testimonial,
                Accounts = UOW.Accounts.GetAll(),
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
            Testimonial testimonial = UOW.Testimonials.GetById(id);
            if (testimonial == null)
            {
                return HttpNotFound();
            }
            TestimonialVM vm = new TestimonialVM
            {
                Testimonial = testimonial,
                Accounts = UOW.Accounts.GetAll(),
                ImageSets = UOW.ImageSets.GetAll()
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Testimonial testimonial = UOW.Testimonials.GetById(id);
            if (testimonial == null)
            {
                return HttpNotFound();
            }
            UOW.Testimonials.Delete(testimonial);
            UOW.Commit();
            return RedirectToAction("Index");
        }




        

    }
}
