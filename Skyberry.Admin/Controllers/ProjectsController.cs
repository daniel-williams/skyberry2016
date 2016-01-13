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
    [Authorize(Roles = "Admin")]
    public class ProjectsController : _BaseController
    {
        public ProjectsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Name, Description")] ProjectSearchCriteria searchCriteria = null)
        {
            ProjectListVM vm = new ProjectListVM
            {
                Projects = UOW.Projects.GetAllPaged(pageSortCriteria, searchCriteria),
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
            Project project = UOW.Projects.GetById(id);
            if (project == null)
            {
                return HttpNotFound();
            }
            ProjectVM vm = new ProjectVM
            {
                Project = project,
                Accounts = UOW.Accounts.GetAll()
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            ProjectVM vm = new ProjectVM
            {
                Accounts = UOW.Accounts.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "Project")] Project project)
        {
            if (ModelState.IsValid)
            {
                Project newProject = new Project();
                newProject.Id = Guid.NewGuid();
                newProject.Name = project.Name;
                newProject.Description = project.Description;
                newProject.Status = project.Status;
                newProject.StartDate = project.StartDate;
                newProject.EstimatedCompletionDate = project.EstimatedCompletionDate;
                newProject.CompletionDate = project.CompletionDate;
                newProject.CreatedDate = DateTime.Now;
                newProject.AccountId = project.AccountId;

                UOW.Projects.Add(newProject);
                UOW.Commit();
                project = newProject;
            }
            ProjectVM vm = new ProjectVM
            {
                Project = project,
                Accounts = UOW.Accounts.GetAll()
            };
            return View("Edit", vm);
        }

        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Project project = UOW.Projects.GetById(id);
            if (project == null)
            {
                return HttpNotFound();
            }
            ProjectVM vm = new ProjectVM
            {
                Project = project,
                Accounts = UOW.Accounts.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "Project")] Project project)
        {
            Project dbProject = UOW.Projects.GetById(project.Id);
            if (dbProject != null)
            {
                dbProject.Name = project.Name;
                dbProject.Description = project.Description;
                dbProject.Status = project.Status;
                dbProject.StartDate = project.StartDate;
                dbProject.EstimatedCompletionDate = project.EstimatedCompletionDate;
                dbProject.CompletionDate = project.CompletionDate;
                dbProject.AccountId = project.AccountId;

                UOW.Commit();
                project = dbProject;
            }

            ProjectVM vm = new ProjectVM
            {
                Project = project,
                Accounts = UOW.Accounts.GetAll()
            };
            return View(vm);
        }

        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Project project = UOW.Projects.GetById(id);
            if (project == null)
            {
                return HttpNotFound();
            }
            ProjectVM vm = new ProjectVM
            {
                Project = project,
                Accounts = UOW.Accounts.GetAll()
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Project project = UOW.Projects.GetById(id);
            if (project == null)
            {
                return HttpNotFound();
            }
            UOW.Projects.Delete(project);
            UOW.Commit();
            return RedirectToAction("Index");
        }
    }
}
