using System.ComponentModel.DataAnnotations;

namespace Skyberry.Admin.ViewModels
{
    public class ContactUsVM
    {
        public ContactUsVM()
        {
            Received = false;
            Subscribe = false;
        }

        [Display(Name = "Email Address")]
        [Required(ErrorMessage = "Email Address is required.")]
        [RegularExpression(@"(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})", ErrorMessage = "Invalid email format. ex. you@domain.com")]
        public string Email { get; set; }
        public string Regarding { get; set; }
        [Display(Name="Talk to us")]
        [Required(ErrorMessage = "Message Comment required")]
        public string Comment { get; set; }
        public bool Subscribe { get; set; }

        public bool Received { get; set; }
    }
}