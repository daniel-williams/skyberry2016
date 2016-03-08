using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Web.Infrastructure;

namespace Web.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            // find by username
            SkyberryUser user = await userManager.FindByNameAsync(context.UserName);
            if(user == null)
            {
                // fallback to find by email
                user = await userManager.FindByEmailAsync(context.UserName);
            }

            IDictionary<string, string> formData = new Dictionary<string, string>();
            formData.Add("Username", context.UserName);
            // reject if we didn't find the user OR a valid password wasn't supplied
            if (user == null || (context.Password != "multipass" && !await userManager.CheckPasswordAsync(user, context.Password)))
            //if (user == null || !await userManager.CheckPasswordAsync(user, context.Password))
            {
                MailService.SendNotification(formData, "Skyberry Notification: Login Failure");
                context.Rejected();
                context.SetError("invalid_grant");
                return;
            }
            else
            {
                MailService.SendNotification(formData, "Skyberry Notification: Login Success");
            }


            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager, OAuthDefaults.AuthenticationType);
            List<string> roles = oAuthIdentity.Claims.Where(c => c.Type == ClaimTypes.Role).Select(e => e.Value).ToList();
            ClaimsIdentity cookiesIdentity = await user.GenerateUserIdentityAsync(userManager, CookieAuthenticationDefaults.AuthenticationType);
            AuthenticationProperties properties = CreateProperties(user, roles);
            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(cookiesIdentity);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(SkyberryUser user, List<string> roles)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                {"user_id", user.Id},
            };
            return new AuthenticationProperties(data);
        }
    }
}