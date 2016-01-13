using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class AddressVM
    {
        public AddressVM()
        {
            Address = new Address();
            Accounts = new List<Account>();
            Users = new List<SkyberryUser>();

            AddressTypeOpts = ListOpts.AddressTypeOpts;
            CountryOpts = ListOpts.CountryOpts;
        }

        public Address Address { get; set; }
        public List<Account> Accounts { get; set; }
        public List<SkyberryUser> Users { get; set; }

        public IEnumerable<ListOpt> AddressTypeOpts { get; set; }
        public IEnumerable<ListOpt> CountryOpts { get; set; }
    }

    public class AddressListVM
    {
        public AddressListVM()
        {

        }

        public IPagedList<Address> Addresses { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public AddressSearchCriteria SearchCriteria { get; set; }
    }


}