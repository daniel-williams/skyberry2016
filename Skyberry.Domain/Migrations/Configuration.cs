namespace Skyberry.Domain.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Skyberry.Domain;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Skyberry.Domain.SkyberryContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Skyberry.Domain.SkyberryContext context)
        {
            var UserManager = new UserManager<SkyberryUser>(new UserStore<SkyberryUser>(context));
            var RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

            if (!RoleManager.RoleExists("Admin"))
            {
                var adminIR = RoleManager.Create(new IdentityRole("Admin"));
            }

            if (!RoleManager.RoleExists("Client"))
            {
                var clientIR = RoleManager.Create(new IdentityRole("Client"));
            }

            foreach(SkyberryUser user in UserManager.Users.ToList())
            {
                UserManager.AddToRole(user.Id, "Client");
                if(user.UserName == "daniel" || user.UserName == "lacey")
                {
                    UserManager.AddToRole(user.Id, "Admin");
                }
            }

            context.Counters.AddOrUpdate(
                e=>e.Name,
                new Counter { CounterId = Guid.NewGuid(), Name = "Account_Number", CurrentNumber = 10064 },
                new Counter { CounterId = Guid.NewGuid(), Name = "Contract_Number", CurrentNumber = 5472 },
                new Counter { CounterId = Guid.NewGuid(), Name = "Invoice_InvoiceNumber", CurrentNumber = 400 }
                );



            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
