using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class UserVM
    {
        public UserVM()
        {
            User = new SkyberryUser();
        }

        public SkyberryUser User { get; set; }
    }

    public class UserListVM
    {
        public UserListVM()
        {

        }

        public IPagedList<SkyberryUser> Users { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public UserSearchCriteria SearchCriteria { get; set; }
    }
}