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
    public class ContactsController : _BaseController
    {
        public ContactsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "ContactType, ContactData")] ContactSearchCriteria searchCriteria = null)
        {
            ContactListVM vm = new ContactListVM
            {
                Contacts = UOW.Contacts.GetAllPaged(pageSortCriteria, searchCriteria),
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
            Contact contact = UOW.Contacts.GetById(id);
            if (contact == null)
            {
                return HttpNotFound();
            }
            ContactVM vm = new ContactVM
            {
                Contact = contact
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            ContactVM vm = new ContactVM
            {
                Accounts = UOW.Accounts.GetAll(),
                Users = UOW.SkyberryUsers.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "Contact")] Contact contact, [Bind(Include = "Accounts")] List<Guid> accounts, [Bind(Include = "Users")] List<Guid> users)
        {
            if (ModelState.IsValid)
            {
                if (accounts == null && users == null)
                {
                    ModelState.AddModelError(string.Empty, "Contact must be associated with at least one account or user.");
                }
                else
                {
                    Contact newContact = new Contact();
                    newContact.Id = Guid.NewGuid();
                    newContact.ContactType = contact.ContactType;
                    newContact.ContactData = contact.ContactData;

                    newContact.Accounts.Clear();
                    if (accounts != null)
                    {
                        newContact.Accounts = UOW.Accounts.GetSetByIds(accounts);
                    }

                    newContact.SkyberryUsers.Clear();
                    if (users != null)
                    {
                        newContact.SkyberryUsers = UOW.SkyberryUsers.GetSetByIds(users);
                    }

                    UOW.Contacts.Add(newContact);
                    UOW.Commit();
                    contact = newContact;
                }
            }
            ContactVM vm = new ContactVM
            {
                Contact = contact,
                Accounts = UOW.Accounts.GetAll(),
                Users = UOW.SkyberryUsers.GetAll()
            };
            return View("Edit", vm);
        }

        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Contact contact = UOW.Contacts.GetById(id);
            if (contact == null)
            {
                return HttpNotFound();
            }
            ContactVM vm = new ContactVM
            {
                Contact = contact,
                Accounts = UOW.Accounts.GetAll(),
                Users = UOW.SkyberryUsers.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "Contact")] Contact contact, [Bind(Include = "Accounts")] List<Guid> accounts, [Bind(Include = "Users")] List<Guid> users)
        {
            Contact dbContact = UOW.Contacts.GetById(contact.Id);
            if (dbContact != null)
            {
                if (accounts == null && users == null)
                {
                    ModelState.AddModelError(string.Empty, "Contact must be associated with at least one account or user.");
                }
                else
                {
                    dbContact.ContactType = contact.ContactType;
                    dbContact.ContactData = contact.ContactData;

                    dbContact.Accounts.Clear();
                    if (accounts != null)
                    {
                        dbContact.Accounts = UOW.Accounts.GetSetByIds(accounts);
                    }

                    dbContact.SkyberryUsers.Clear();
                    if (users != null)
                    {
                        dbContact.SkyberryUsers = UOW.SkyberryUsers.GetSetByIds(users);
                    }

                    UOW.Commit();
                    contact = dbContact;
                }
            }
            else
            {
                return HttpNotFound();
            }
            ContactVM vm = new ContactVM
            {
                Contact = contact,
                Accounts = UOW.Accounts.GetAll(),
                Users = UOW.SkyberryUsers.GetAll()
            };
            return View(vm);
        }

        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Contact contact = UOW.Contacts.GetById(id);
            if (contact == null)
            {
                return HttpNotFound();
            }
            ContactVM vm = new ContactVM
            {
                Contact = contact
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Contact contact = UOW.Contacts.GetById(id);
            if (contact == null)
            {
                return HttpNotFound();
            }
            UOW.Contacts.Delete(contact);
            UOW.Commit();
            return RedirectToAction("Index");
        }
    }
}
