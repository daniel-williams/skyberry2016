using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class AccountVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }

        public virtual ICollection<ProjectListVM> Projects { get; set; }
    }

    public class AccountDetailsVM
    {
        public Guid Id { get; set; }

        public virtual ICollection<InvoiceListVM> Invoices { get; set; }
        public virtual ICollection<PaymentListVM> Payments { get; set; }
    }
}
