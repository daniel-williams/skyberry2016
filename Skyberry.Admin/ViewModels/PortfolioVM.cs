using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class PortfolioImageSetVM
    {
        public PortfolioImageSetVM()
        {
            Accolades = new List<PortfolioAccoladeVM>();
            Testimonials = new List<PortfolioTestimonialVM>();
            Images = new List<PortfolioImageVM>();
        }

        public ImageSet ImageSet
        {
            set
            {
                foreach (var item in value.Accolades)
                {
                    Accolades.Add(new PortfolioAccoladeVM
                    {
                        Title = item.Title,
                        Description = item.Description
                    }
                    );
                }

                foreach (var item in value.Testimonials)
                {
                    Testimonials.Add(new PortfolioTestimonialVM
                    {
                        Title = item.Title,
                        Description = item.Description
                    }
                    );
                }

                foreach (var item in value.ImageSetItems.OrderBy(e=>e.Position))
                {
                    Image image = item.Image;
                    Images.Add(new PortfolioImageVM
                    {
                        DocumentId = image.Id.ToString(),
                        Filename = image.Filename,
                        Title = image.Title,
                        Description = image.Description
                    }
                    );
                }
            }
        }
            

        public List<PortfolioAccoladeVM> Accolades { get; set; }
        public List<PortfolioTestimonialVM> Testimonials { get; set; }
        public List<PortfolioImageVM> Images { get; set; }
    }

    public class PortfolioAccoladeVM
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class PortfolioTestimonialVM
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class PortfolioImageVM
    {
        public string DocumentId { get; set; }
        public string Filename { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}