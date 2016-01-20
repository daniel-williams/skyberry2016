using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Infrastructure;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;

namespace Web.Providers
{
    public class RefreshTokenProvider : IAuthenticationTokenProvider
    {
        private static ConcurrentDictionary<string, AuthenticationTicket> _refreshTokens = new ConcurrentDictionary<string, AuthenticationTicket>();

        public async Task CreateAsync(AuthenticationTokenCreateContext context)
        {
            Guid guid = Guid.NewGuid();

            // maybe only create a handle the first time, then re-use for same client
            // copy properties and set the desired lifetime of refresh token
            var refreshTokenProperties = new AuthenticationProperties(context.Ticket.Properties.Dictionary)
            {
                IssuedUtc = context.Ticket.Properties.IssuedUtc,
                ExpiresUtc = DateTime.UtcNow.AddDays(30)
            };
            var refreshTokenTicket = new AuthenticationTicket(context.Ticket.Identity, refreshTokenProperties);

            //_refreshTokens.TryAdd(guid, context.Ticket);
            _refreshTokens.TryAdd(ComputeHash(guid), refreshTokenTicket);

            context.SetToken(guid.ToString());
        }

        public async Task ReceiveAsync(AuthenticationTokenReceiveContext context)
        {
            Guid token;
            if (Guid.TryParse(context.Token, out token))
            {
                AuthenticationTicket ticket;

                if (_refreshTokens.TryRemove(ComputeHash(token), out ticket))
                {
                    context.SetTicket(ticket);
                }
            }
        }

        public void Create(AuthenticationTokenCreateContext context)
        {
            CreateAsync(context);
        }

        public void Receive(AuthenticationTokenReceiveContext context)
        {
            ReceiveAsync(context);
        }

        private string ComputeHash(Guid input)
        {
            byte[] source = input.ToByteArray();

            var encoder = new SHA256Managed();
            byte[] encoded = encoder.ComputeHash(source);

            return Convert.ToBase64String(encoded);
        }
    }
}