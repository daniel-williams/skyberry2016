using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class AccountVM
    {
        public AccountVM()
        {
            Account = new Account();
            Users = new List<SkyberryUser>();
            IndustryTypeOpts = ListOpts.IndustryTypeOpts;
        }

        public Account Account { get; set; }
        public List<SkyberryUser> Users { get; set; }
        public IEnumerable<ListOpt> IndustryTypeOpts { get; set; }
    }

    public class AccountListVM
    {
        public AccountListVM()
        {

        }

        public IPagedList<Account> Accounts { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public AccountSearchCriteria SearchCriteria { get; set; }
    }

    
}