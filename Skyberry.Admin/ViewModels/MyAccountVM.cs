using Skyberry.Domain;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Skyberry.Admin.ViewModels
{
    public class MyAccountSummaryVM
    {
        public SkyberryUser User { get; set; }
        public Account Account { get; set; }
        public List<Account> Accounts { get; set; }
    }

    public class MyAccountProjectsVM
    {
        public MyAccountProjectsVM()
        {
            Projects = new List<Project>();
        }

        public SkyberryUser User { get; set; }
        public Account Account { get; set; }
        public List<Project> Projects { get; set; }
    }

    public class MyAccountDesignReviewVM
    {
        public MyAccountDesignReviewVM()
        {
            Received = false;
        }

        public SkyberryUser User { get; set; }
        public Account Account { get; set; }
        public DesignReview DesignReview { get; set; }
        public bool Received;
    }

    public class MyAccountBillingVM
    {
        public SkyberryUser User { get; set; }
        public Account Account { get; set; }
    }

    public class MyAccountSupportVM
    {
        public MyAccountSupportVM()
        {
            Received = false;
        }

        private SkyberryUser _User;
        public SkyberryUser User
        {
            get
            {
                return _User;
            }
            set
            {
                _User = value;
                Name = string.IsNullOrWhiteSpace(Name) ? _User.FirstName + " " + _User.LastName : "";

                if (string.IsNullOrWhiteSpace(Email) && _User.Contacts != null && _User.Contacts.Count > 0)
                {
                    foreach (var item in _User.Contacts)
                    {
                        if (item.ContactType == "Email")
                        {
                            Email = item.ContactData;
                        }
                    }

                }
            }
        }
        public Account Account { get; set; }

        public string Name { get; set; }
        [Display(Name = "Email Address")]
        [Required(ErrorMessage = "Email Address is required.")]
        [RegularExpression(@"(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})", ErrorMessage = "Invalid email format. ex. you@domain.com")]
        public string Email { get; set; }
        public string Regarding { get; set; }
        [Required(ErrorMessage = "Message detail required")]
        public string Details { get; set; }
        public bool Received;
    }
}