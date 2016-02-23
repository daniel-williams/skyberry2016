using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class InvoiceListVM
    {
        public Guid Id { get; set; }

        [Display(Name = "Original Filename")]
        public string FilenameOriginal { get; set; }

        [Display(Name = "Number")]
        public string InvoiceNumber { get; set; }

        public decimal Amount { get; set; }

        [Display(Name = "Sent Date")]
        public DateTime? SentDate { get; set; }

        [Display(Name = "Due Date")]
        public DateTime? DueDate { get; set; }

        [Display(Name = "Estimate")]
        public bool IsEstimate { get; set; }
    }
}