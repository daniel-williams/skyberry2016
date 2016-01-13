using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class NavVM
    {
        public NavVM(string area = "", string section = "" )
        {
            Area = area;
            Section = section;
        }
        public string Area { get; set; }
        public string Section { get; set; }
    }
}