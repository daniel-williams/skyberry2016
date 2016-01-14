using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Models
{
    public class UserVM
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }

        public IList<string> Roles { get; set; }
        public virtual ICollection<ContactVM> Contacts { get; set; }
    }
}
