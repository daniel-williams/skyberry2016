using System.Web;
using System.Web.Optimization;

namespace Skyberry.Admin
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/js/jquery").Include(
            //            "~/scripts/jquery/jquery-{version}.js",
            //            "~/scripts/jquery/jquery.validate*",
            //            "~/scripts/jquery/jquery-ui.js"
            //            ));

            bundles.Add(new ScriptBundle("~/bundles/js/modernizr").Include(
                        "~/scripts/modernizr-*"));





            bundles.Add(new StyleBundle("~/bundles/css/site").Include(
                      "~/styles/bootstrap/bootstrap.css",
                      "~/styles/jquery/jquery-ui.css",
                      "~/styles/jquery/jquery.multiselect.filter.css",
                      "~/styles/site.css"));

            bundles.Add(new StyleBundle("~/bundles/css/portfolio").Include(
                      "~/styles/portfolio.css"));

            bundles.Add(new StyleBundle("~/bundles/css/account").Include(
                      "~/styles/account.css"));


            bundles.Add(new ScriptBundle("~/bundles/js/site").Include(
                "~/scripts/jquery/jquery-{version}.js",
                "~/scripts/jquery/jquery.validate*",
                "~/scripts/jquery/jquery-ui.js",
                "~/scripts/jquery/plugins/jquery.json-2.4.js",
                "~/scripts/bootstrap/bootstrap.js",
                "~/scripts/underscore/underscore.js",
                "~/scripts/respond/respond.js",
                //"~/scripts/tinymce/tinymce.min.js",
                //"~/scripts/tinymce/jquery.tinymce.min.js",
                "~/scripts/jquery-scrollspy.js",
                "~/scripts/site.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/js/testimonials").Include(
                        "~/scripts/testimonials.js"));

            bundles.Add(new ScriptBundle("~/bundles/js/portfolio").Include(
                        "~/scripts/jquery.simplemodal.1.4.4.min.js",
                        "~/scripts/portfolio.js"));


            

            bundles.Add(new StyleBundle("~/bundles/css/admin").Include(
                "~/styles/bootstrap/bootstrap.css",
                "~/styles/jquery/jquery-ui.css",
                "~/styles/jquery/jquery.multiselect.filter.css",
                "~/styles/admin.css"
                ));

            bundles.Add(new ScriptBundle("~/bundles/js/admin").Include(
                "~/scripts/jquery/jquery-{version}.js",
                "~/scripts/jquery/jquery.validate*",
                "~/scripts/jquery/jquery-ui.js",
                "~/scripts/bootstrap/bootstrap.js",
                "~/scripts/underscore/underscore.js",
                "~/scripts/respond/respond.js",
                "~/scripts/jquery/plugins/jquery.multiselect.js",
                "~/scripts/jquery/plugins/jquery.multiselect.filter.js",
                //"~/scripts/tinymce/tinymce.min.js",
                //"~/scripts/tinymce/jquery.tinymce.min.js",
                "~/scripts/admin.js"
                ));
        }
    }
}
