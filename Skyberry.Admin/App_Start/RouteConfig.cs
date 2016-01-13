using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Skyberry.Admin
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            #region admin routes

            routes.MapRoute(
                name: "Accolades",
                url: "admin/Accolades/{action}/{id}",
                defaults: new { controller = "Accolades", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Accounts",
                url: "admin/Accounts/{action}/{id}",
                defaults: new { controller = "Accounts", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Addresses",
                url: "admin/Addresses/{action}/{id}",
                defaults: new { controller = "Addresses", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Contacts",
                url: "admin/Contacts/{action}/{id}",
                defaults: new { controller = "Contacts", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "ContractDocuments",
                url: "admin/ContractDocuments/{action}/{id}",
                defaults: new { controller = "ContractDocuments", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Contracts",
                url: "admin/Contracts/{action}/{id}",
                defaults: new { controller = "Contracts", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "DesignReviews",
                url: "admin/DesignReviews/{action}/{id}",
                defaults: new { controller = "DesignReviews", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Images",
                url: "admin/Images/{action}/{id}",
                defaults: new { controller = "Images", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "ImageSetItems",
                url: "admin/ImageSetItems/{action}/{id}",
                defaults: new { controller = "ImageSetItems", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
              name: "ImageSets",
              url: "admin/ImageSets/{action}/{id}",
              defaults: new { controller = "ImageSets", action = "Index", id = UrlParameter.Optional }
                );
            routes.MapRoute(
                name: "Invoices",
                url: "admin/Invoices/{action}/{id}",
                defaults: new { controller = "Invoices", action = "Index", id = UrlParameter.Optional }
                );
            routes.MapRoute(
                name: "Payments",
                url: "admin/Payments/{action}/{id}",
                defaults: new { controller = "Payments", action = "Index", id = UrlParameter.Optional }
                );
            routes.MapRoute(
                name: "ProjectDocuments",
                url: "admin/ProjectDocuments/{action}/{id}",
                defaults: new { controller = "ProjectDocuments", action = "Index", id = UrlParameter.Optional }
                );
            routes.MapRoute(
                name: "Projects",
                url: "admin/Projects/{action}/{id}",
                defaults: new { controller = "Projects", action = "Index", id = UrlParameter.Optional }
                );
            routes.MapRoute(
                name: "ReviewDocuments",
                url: "admin/ReviewDocuments/{action}/{id}",
                defaults: new { controller = "ReviewDocuments", action = "Index", id = UrlParameter.Optional }
                );
            routes.MapRoute(
                name: "Tags",
                url: "admin/Tags/{action}/{id}",
                defaults: new { controller = "Tags", action = "Index", id = UrlParameter.Optional }
                );
            routes.MapRoute(
                name: "Testimonials",
                url: "admin/Testimonials/{action}/{id}",
                defaults: new { controller = "Testimonials", action = "Index", id = UrlParameter.Optional }
                );
            routes.MapRoute(
                name: "Users",
                url: "admin/Users/{action}/{id}",
                defaults: new { controller = "Users", action = "Index", id = UrlParameter.Optional }
                );


            routes.MapRoute(
                name: "Admin",
                url: "admin/{action}/{id}",
                defaults: new { controller = "Admin", action = "Index", id = UrlParameter.Optional }
            );

            #endregion


            routes.MapRoute(
                name: "PortfolioFilters",
                url: "portfolio/filters/{parent}",
                defaults: new { controller = "Public", action = "PortfolioFilters", parent = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "PortfolioImages",
                url: "portfolio/images/{filter1}/{filter2}",
                defaults: new { controller = "Public", action = "PortfolioImages", filter1 = UrlParameter.Optional, filter2 = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "PortfolioImageSet",
                url: "portfolio/imageset",
                defaults: new { controller = "Public", action = "PortfolioImageSet" }
            );

            routes.MapRoute(
                name: "FeaturedTestimonials",
                url: "testimonials/featured",
                defaults: new { controller = "Public", action = "GetFeatured" }
            );


            #region MyAccount

            routes.MapRoute(
                name: "MyAccountSignIn",
                url: "my-account/sign-in",
                defaults: new { controller = "MyAccount", action = "SignIn" }
            );

            routes.MapRoute(
                name: "MyAccountSignOut",
                url: "my-account/sign-out",
                defaults: new { controller = "MyAccount", action = "SignOut" }
            );

            routes.MapRoute(
                name: "MyAccountGoodbye",
                url: "my-account/goodbye",
                defaults: new { controller = "MyAccount", action = "Goodbye" }
            );

            routes.MapRoute(
                name: "MyAccountSummary",
                url: "my-account/summary",
                defaults: new { controller = "MyAccount", action = "Summary" }
            );

            routes.MapRoute(
                name: "MyAccountProjects",
                url: "my-account/projects",
                defaults: new { controller = "MyAccount", action = "Projects" }
            );
            routes.MapRoute(
                name: "MyAccountFileDownload",
                url: "my-account/file/{id}",
                defaults: new { controller = "MyAccount", action = "FileDownload", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "MyAccountDesignReview",
                url: "my-account/design-review/{id}",
                defaults: new { controller = "MyAccount", action = "MyAccountDesignReview", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "MyAccountBilling",
                url: "my-account/billing",
                defaults: new { controller = "MyAccount", action = "Billing" }
            );
            routes.MapRoute(
                name: "MyAccountSupport",
                url: "my-account/support",
                defaults: new { controller = "MyAccount", action = "Support" }
            );

            #endregion


            routes.MapRoute(
                name: "PublicSkyberry",
                url: "",
                defaults: new { controller = "Public", action = "Skyberry" }
            );

            routes.MapRoute(
                name: "PublicCreative",
                url: "creative",
                defaults: new { controller = "Public", action = "Creative" }
            );

            routes.MapRoute(
                name: "PublicDevelopment",
                url: "development",
                defaults: new { controller = "Public", action = "Development" }
            );

            routes.MapRoute(
                name: "PublicPortfolio",
                url: "portfolio",
                defaults: new { controller = "Public", action = "Portfolio" }
            );

            routes.MapRoute(
                name: "PublicContact",
                url: "contact",
                defaults: new { controller = "Public", action = "Contact" }
            );





            routes.MapRoute(
                name: "PublicOurClients",
                url: "our-clients",
                defaults: new { controller = "Public", action = "OurClients" }
            );

            routes.MapRoute(
                name: "PublicClientTestimonials",
                url: "client-testimonials",
                defaults: new { controller = "Public", action = "ClientTestimonials" }
            );

            routes.MapRoute(
                name: "PublicToolsAndResources",
                url: "tools-and-resources",
                defaults: new { controller = "Public", action = "ToolsAndResources" }
            );

            routes.MapRoute(
                name: "PublicNewsAndPress",
                url: "news-and-press",
                defaults: new { controller = "Public", action = "NewsAndPress" }
            );

            routes.MapRoute(
                name: "PublicOpportunities",
                url: "opportunities",
                defaults: new { controller = "Public", action = "Opportunities" }
            );

            routes.MapRoute(
                name: "PublicSupportAndFAQ",
                url: "support-and-faq",
                defaults: new { controller = "Public", action = "SupportAndFAQ" }
            );

            routes.MapRoute(
                name: "PublicSubscribeToNewsletter",
                url: "subscribe-to-newsletter",
                defaults: new { controller = "Public", action = "SubscribeToNewsletter" }
            );

            routes.MapRoute(
                name: "PublicPrivacyPolicy",
                url: "privacy-policy",
                defaults: new { controller = "Public", action = "PrivacyPolicy" }
            );





            #region Last Line of Defense

            routes.MapRoute(
                name: "LastLineOfDefense",
                url: "{*url}",
                defaults: new { controller = "Public", action = "NotFound" }
            );

            #endregion

        }
    }
}
