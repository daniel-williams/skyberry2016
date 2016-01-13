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
    public class ContractsController : _BaseController
    {
        public ContractsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Title, Description, Version")] ContractSearchCriteria searchCriteria = null)
        {
            ContractListVM vm = new ContractListVM
            {
                Contracts = UOW.Contracts.GetAllPaged(pageSortCriteria, searchCriteria),
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
            Contract contract = UOW.Contracts.GetById(id);
            if (contract == null)
            {
                return HttpNotFound();
            }
            ContractVM vm = new ContractVM
            {
                Contract = contract
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            ContractVM vm = new ContractVM
            {
                Projects = UOW.Projects.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "Contract")] Contract contract, [Bind(Include="Projects")] List<Guid> projects)
        {
            if (!string.IsNullOrWhiteSpace(contract.Title) && projects != null && projects.Count > 0)
            {
                Contract newContract = new Contract();
                newContract.Id = Guid.NewGuid();
                newContract.Title = contract.Title;
                newContract.CreatedDate = DateTime.Now;

                Counter dbCounter = UOW.Counters.GetByName("Contract_Number");
                int nextNumber = dbCounter.CurrentNumber = dbCounter.CurrentNumber + 1;
                newContract.Number = nextNumber.ToString();

                newContract.Projects.Clear();
                if (projects != null)
                {
                    newContract.Projects = UOW.Projects.GetSetByIds(projects);

                    UOW.Commit();
                    contract = newContract;
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Contracts must be associated with one or more projects.");
                }

                UOW.Contracts.Add(newContract);
                UOW.Commit();
                contract = newContract;
            }
            ContractVM vm = new ContractVM
            {
                Contract = contract,
                Projects = UOW.Projects.GetAll()
            };
            return View("Edit", vm);
        }

        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Contract contract = UOW.Contracts.GetById(id);
            if (contract == null)
            {
                return HttpNotFound();
            }
            ContractVM vm = new ContractVM
            {
                Contract = contract,
                Projects = UOW.Projects.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "Contract")] Contract contract, [Bind(Include = "Projects")] List<Guid> projects)
        {
            Contract dbContract = UOW.Contracts.GetById(contract.Id);
            if (dbContract != null)
            {
                dbContract.Title = contract.Title;

                dbContract.Projects.Clear();
                if (projects != null)
                {
                    dbContract.Projects = UOW.Projects.GetSetByIds(projects);

                    UOW.Commit();
                    contract = dbContract;
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Contracts must be associated with one or more projects.");
                }
            }
            else
            {
                return HttpNotFound();
            }
            ContractVM vm = new ContractVM
            {
                Contract = contract,
                Projects = UOW.Projects.GetAll()
            };
            return View(vm);
        }

        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Contract contract = UOW.Contracts.GetById(id);
            if (contract == null)
            {
                return HttpNotFound();
            }
            ContractVM vm = new ContractVM
            {
                Contract = contract
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Contract contract = UOW.Contracts.GetById(id);
            if (contract == null)
            {
                return HttpNotFound();
            }
            UOW.Contracts.Delete(contract);
            UOW.Commit();
            return RedirectToAction("Index");
        }
    }
}
