using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class ReviewDocumentVM : _DocVM
    {
        public string DocType { get; set; }
        public byte Order { get; set; }
    }
}
