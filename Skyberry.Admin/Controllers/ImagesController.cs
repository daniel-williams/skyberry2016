using System;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Skyberry.Domain;
using System.IO;
using Skyberry.Admin.Infrastructure;
using Skyberry.Admin.ViewModels;
using Skyberry.Domain.Linq;
using System.Collections.Generic;

namespace Skyberry.Admin.Controllers
{
    [RequireHttps]
    [Authorize(Roles="Admin")]
    public class ImagesController : _BaseController
    {
        public ImagesController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Filename, Title, Version")] ImageSearchCriteria searchCriteria = null)
        {
            ImageListVM vm = new ImageListVM
            {
                Images = UOW.Images.GetAllPaged(pageSortCriteria, searchCriteria),
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
            Image image = UOW.Images.GetById(id);
            if (image == null)
            {
                return HttpNotFound();
            }
            ImageVM vm = new ImageVM
            {
                Image = image
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            ImageVM vm = new ImageVM
            {
                Image = new Image(),
                Tags = UOW.Tags.GetAll(),
                //ImageSets = UOW.ImageSets.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "Image")] Image image, [Bind(Include = "Tags")] List<Guid> tags)
        {
            if (Request.Files.Count > 0 && Request.Files[0].ContentLength > 0)
            {
                HttpPostedFileBase file = Request.Files[0];

                Guid docId = Guid.NewGuid();
                string originalFilename = file.FileName;
                string fileExt = Path.GetExtension(file.FileName);
                string filename = docId.ToString() + fileExt;

                string fullPath = StorageRoot + "\\" + filename;
                file.SaveAs(fullPath);

                Image newImage = new Image();

                newImage.Id = docId;
                newImage.Filename = filename;
                newImage.FilenameOriginal = originalFilename;
                newImage.FileExt = fileExt;
                newImage.FileMimeType = GetMimeType(fullPath);
                newImage.FileSize = file.ContentLength;
                newImage.Title = image.Title;
                newImage.Description = image.Description;
                newImage.Version = image.Version;
                newImage.CreatedDate = DateTime.Now;
                newImage.FilePath = "/files";
                newImage.IsActive = true;
                //newImage.ImageSetId = image.ImageSetId;

                if (tags != null)
                {
                    newImage.Tags = UOW.Tags.GetSetByIds(tags);
                }

                UOW.Images.Add(newImage);

                UOW.Commit();
                image = newImage;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "You must supply a valid file.");
            }

            ImageVM vm = new ImageVM
            {
                Image = image,
                Tags = UOW.Tags.GetAll(),
                //ImageSets = UOW.ImageSets.GetAll()
            };
            return View("Edit", vm);
        }

        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Image image = UOW.Images.GetById(id);
            if (image == null)
            {
                return HttpNotFound();
            }
            ImageVM vm = new ImageVM
            {
                Image = image,
                Tags = UOW.Tags.GetAll(),
                //ImageSets = UOW.ImageSets.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix="Image")] Image image, [Bind(Include="Tags")] List<Guid> tags)
        {
            Image dbImage = UOW.Images.GetById(image.Id);
            if (dbImage != null)
            {
                dbImage.FilenameOriginal = image.FilenameOriginal;
                dbImage.Title = image.Title;
                dbImage.Description = image.Description;
                dbImage.Version = image.Version;
                dbImage.IsActive = image.IsActive;

                dbImage.Tags.Clear();
                if(tags != null)
                {
                    dbImage.Tags = UOW.Tags.GetSetByIds(tags);
                }


                if (Request.Files.Count > 0 && Request.Files[0].ContentLength > 0)
                {
                    HttpPostedFileBase file = Request.Files[0];

                    Guid docId = Guid.NewGuid();
                    string originalFilename = file.FileName;
                    string fileExt = Path.GetExtension(file.FileName);
                    string filename = docId.ToString() + fileExt;

                    string fullPath = StorageRoot + "\\" + filename;
                    file.SaveAs(fullPath);

                    //dbImage.DocumentId = docId;
                    dbImage.Filename = filename;
                    dbImage.FileExt = fileExt;
                    dbImage.FileMimeType = GetMimeType(fullPath);
                    dbImage.FileSize = file.ContentLength;
                }


                UOW.Commit();
                image = dbImage;
            }

            ImageVM vm = new ImageVM
            {
                Image = image,
                Tags = UOW.Tags.GetAll(),
                //ImageSets = UOW.ImageSets.GetAll()
            };
            return View(vm);
        }

        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Image image = UOW.Images.GetById(id);
            if (image == null)
            {
                return HttpNotFound();
            }
            ImageVM vm = new ImageVM
            {
                Image = image
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Image image = UOW.Images.GetById(id);
            if (image == null)
            {
                return HttpNotFound();
            }
            UOW.Images.Delete(image);
            UOW.Commit();
            return RedirectToAction("Index");
        }


        
    }
}
