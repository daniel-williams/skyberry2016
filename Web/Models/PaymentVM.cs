using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class PaymentListVM
    {
        public Guid Id { get; set; }

        public decimal Amount { get; set; }

        [Display(Name = "Payment Type")]
        public string PaymentType { get; set; }

        [Display(Name = "Payment Date")]
        public DateTime? PaymentDate { get; set; }
    }
}