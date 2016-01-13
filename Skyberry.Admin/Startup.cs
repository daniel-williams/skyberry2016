using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Skyberry.Admin.Startup))]
namespace Skyberry.Admin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
