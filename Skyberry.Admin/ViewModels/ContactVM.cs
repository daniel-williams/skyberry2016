using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class ContactVM
    {
        public ContactVM()
        {
            Contact = new Contact();
            Accounts = new List<Account>();
            Users = new List<SkyberryUser>();

            ContactTypeOpts = ListOpts.ContactTypeOpts;
        }

        public Contact Contact { get; set; }
        public List<Account> Accounts { get; set; }
        public List<SkyberryUser> Users { get; set; }

        public IEnumerable<ListOpt> ContactTypeOpts { get; set; }
    }

    public class ContactListVM
    {
        public ContactListVM()
        {

        }

        public IPagedList<Contact> Contacts { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public ContactSearchCriteria SearchCriteria { get; set; }
    }


}