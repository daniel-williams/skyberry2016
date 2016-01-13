using PagedList;
using Skyberry.Domain.Linq;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class InvoiceVM
    {
        public InvoiceVM()
        {
            Invoice = new Invoice();
            Projects = new List<Project>();
            Accounts = new List<Account>();
        }

        public Invoice Invoice { get; set; }
        public List<Project> Projects
        {
            set
            {
                _ProjectOpts.Clear();
                _ProjectOpts.Add(new ListOpt
                {
                    Id = string.Empty,
                    Value = "none"
                });
                foreach (var item in value)
                {
                    _ProjectOpts.Add(new ListOpt
                    {
                        Id = item.Id.ToString(),
                        Value = item.Account.Name + " - " + item.Name
                    });
                }
            }
        }
        private List<ListOpt> _ProjectOpts = new List<ListOpt>();
        public List<ListOpt> ProjectOpts
        {
            get
            {
                return _ProjectOpts;
            }
        }
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

    public class InvoiceListVM
    {
        public InvoiceListVM()
        {

        }

        public IPagedList<Invoice> Invoices { get; set; }
        public PageSortCriteria PageSortCriteria { get; set; }
        public InvoiceSearchCriteria SearchCriteria { get; set; }
    }


}