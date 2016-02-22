using Microsoft.AspNet.Identity.EntityFramework;
using Skyberry.Domain;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Skyberry.Domain
{
    public class SkyberryContext : IdentityDbContext<SkyberryUser>
    {
        public SkyberryContext()
            : base("skyberry2016")
        {
        }

        //public virtual DbSet<SkyberryUser> SkyberryUsers { get; set; }
        public virtual DbSet<Accolade> Accolades { get; set; }
        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Contract> Contracts { get; set; }
        public virtual DbSet<ContractDocument> ContractDocuments { get; set; }
        public virtual DbSet<DesignReview> DesignReviews { get; set; }
        public virtual DbSet<Document> Documents { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<ImageSet> ImageSets { get; set; }
        public virtual DbSet<ImageSetItem> ImageSetItems { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectDocument> ProjectDocuments { get; set; }
        public virtual DbSet<ReviewComment> ReviewComments { get; set; }
        public virtual DbSet<ReviewDocument> ReviewDocuments { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<Testimonial> Testimonials { get; set; }

        public virtual DbSet<Counter> Counters { get; set; }


        // help ModelBuilder understand our entity relationships
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            base.OnModelCreating(modelBuilder); // make sure membership related models get configured

            modelBuilder.Configurations.Add(new SkyberryUserMap());
            modelBuilder.Configurations.Add(new AccoladeMap());
            modelBuilder.Configurations.Add(new AccountMap());
            modelBuilder.Configurations.Add(new AddressMap());
            modelBuilder.Configurations.Add(new ContactMap());
            modelBuilder.Configurations.Add(new ContractMap());
            modelBuilder.Configurations.Add(new ContractDocumentMap());
            modelBuilder.Configurations.Add(new DesignReviewMap());
            modelBuilder.Configurations.Add(new DocumentMap());
            modelBuilder.Configurations.Add(new ImageMap());
            modelBuilder.Configurations.Add(new ImageSetMap());
            modelBuilder.Configurations.Add(new ImageSetItemMap());
            modelBuilder.Configurations.Add(new InvoiceMap());
            modelBuilder.Configurations.Add(new PaymentMap());
            modelBuilder.Configurations.Add(new ProjectMap());
            modelBuilder.Configurations.Add(new ProjectDocumentMap());
            modelBuilder.Configurations.Add(new ReviewCommentMap());
            modelBuilder.Configurations.Add(new ReviewDocumentMap());
            modelBuilder.Configurations.Add(new TagMap());
            modelBuilder.Configurations.Add(new TestimonialMap());

            modelBuilder.Configurations.Add(new CounterMap());
        }

        public static SkyberryContext Create()
        {
            return new SkyberryContext();
        }
    }


    
}
