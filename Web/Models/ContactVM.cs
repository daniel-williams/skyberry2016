using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class ContactVM
    {
        public Guid Id { get; set; }
        public string Data { get; set; }
        public string Type { get; set; }
    }
}
