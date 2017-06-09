using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GoOstrich.Startup))]
namespace GoOstrich
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
