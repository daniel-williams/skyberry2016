using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class PaymentVM
    {
        public PaymentVM()
        {
            Payment = new Payment();
            PaymentTypeOpts = ListOpts.PaymentTypeOpts;
            Accounts = new List<Account>();
        }

        public Payment Payment { get; set; }
        public IEnumerable<ListOpt> PaymentTypeOpts { get; set; }
        public List<Account> Accounts
        {
            set
            {
                _AccountOpts.Clear();
                _AccountOpts.Add(new ListOpt
                {
                    Id = string.Empty,
                    Value = "none"
                });
                foreach (var item in value)
                {
                    _AccountOpts.Add(new ListOpt
                    {
                        Id = item.Id.ToString(),
                        Value = item.Name
                    });
                }
            }
        }
        private List<ListOpt> _AccountOpts = new List<ListOpt>();
        public List<ListOpt> AccountOpts
        {
            get
            {
                return _AccountOpts;
            }
        }
    }

    public class PaymentListVM
    {
        public PaymentListVM()
        {

        }

        public IPagedList<Payment> Payments { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public PaymentSearchCriteria SearchCriteria { get; set; }
    }


}