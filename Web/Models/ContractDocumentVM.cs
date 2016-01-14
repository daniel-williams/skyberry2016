using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class ContractDocumentVM : _DocVM
    {
        public string DocType { get; set; }
    }
}