using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Skyberry.Domain
{
    public class UnitOfWork : IUnitOfWork
    {

        private AccoladeRepository _Accolades;
        public IAccoladeRepository Accolades
        {
            get
            {
                if (_Accolades == null)
                {
                    _Accolades = new AccoladeRepository(DbContext, Cache);
                }
                return _Accolades;
            }
        }

        private AccountRepository _Accounts;
        public IAccountRepository Accounts
        {
            get
            {
                if (_Accounts == null)
                {
                    _Accounts = new AccountRepository(DbContext, Cache);
                }
                return _Accounts;
            }
        }

        private AddressRepository _Addresses;
        public IAddressRepository Addresses
        {
            get
            {
                if (_Addresses == null)
                {
                    _Addresses = new AddressRepository(DbContext, Cache);
                }
                return _Addresses;
            }
        }

        private ContactRepository _Contacts;
        public IContactRepository Contacts
        {
            get
            {
                if (_Contacts == null)
                {
                    _Contacts = new ContactRepository(DbContext, Cache);
                }
                return _Contacts;
            }
        }

        private ContractRepository _Contracts;
        public IContractRepository Contracts
        {
            get
            {
                if (_Contracts == null)
                {
                    _Contracts = new ContractRepository(DbContext, Cache);
                }
                return _Contracts;
            }
        }

        private ContractDocumentRepository _ContractDocuments;
        public IContractDocumentRepository ContractDocuments
        {
            get
            {
                if (_ContractDocuments == null)
                {
                    _ContractDocuments = new ContractDocumentRepository(DbContext, Cache);
                }
                return _ContractDocuments;
            }
        }

        private DesignReviewRepository _DesignReviews;
        public IDesignReviewRepository DesignReviews
        {
            get
            {
                if (_DesignReviews == null)
                {
                    _DesignReviews = new DesignReviewRepository(DbContext, Cache);
                }
                return _DesignReviews;
            }
        }

        private DocumentRepository _Documents;
        public IDocumentRepository Documents
        {
            get
            {
                if (_Documents == null)
                {
                    _Documents = new DocumentRepository(DbContext, Cache);
                }
                return _Documents;
            }
        }

        private ImageRepository _Images;
        public IImageRepository Images
        {
            get
            {
                if (_Images == null)
                {
                    _Images = new ImageRepository(DbContext, Cache);
                }
                return _Images;
            }
        }

        private ImageSetRepository _ImageSets;
        public IImageSetRepository ImageSets
        {
            get
            {
                if (_ImageSets == null)
                {
                    _ImageSets = new ImageSetRepository(DbContext, Cache);
                }
                return _ImageSets;
            }
        }

        private ImageSetItemRepository _ImageSetItems;
        public IImageSetItemRepository ImageSetItems
        {
            get
            {
                if (_ImageSetItems == null)
                {
                    _ImageSetItems = new ImageSetItemRepository(DbContext, Cache);
                }
                return _ImageSetItems;
            }
        }

        private InvoiceRepository _Invoices;
        public IInvoiceRepository Invoices
        {
            get
            {
                if (_Invoices == null)
                {
                    _Invoices = new InvoiceRepository(DbContext, Cache);
                }
                return _Invoices;
            }
        }

        private PaymentRepository _Payments;
        public IPaymentRepository Payments
        {
            get
            {
                if (_Payments == null)
                {
                    _Payments = new PaymentRepository(DbContext, Cache);
                }
                return _Payments;
            }
        }

        private ProjectRepository _Projects;
        public IProjectRepository Projects
        {
            get
            {
                if (_Projects == null)
                {
                    _Projects = new ProjectRepository(DbContext, Cache);
                }
                return _Projects;
            }
        }

        private ProjectDocumentRepository _ProjectDocuments;
        public IProjectDocumentRepository ProjectDocuments
        {
            get
            {
                if (_ProjectDocuments == null)
                {
                    _ProjectDocuments = new ProjectDocumentRepository(DbContext, Cache);
                }
                return _ProjectDocuments;
            }
        }

        private ReviewDocumentRepository _ReviewDocuments;
        public IReviewDocumentRepository ReviewDocuments
        {
            get
            {
                if (_ReviewDocuments == null)
                {
                    _ReviewDocuments = new ReviewDocumentRepository(DbContext, Cache);
                }
                return _ReviewDocuments;
            }
        }

        private SkyberryUserRepository _SkyberryUsers;
        public ISkyberryUserRepository SkyberryUsers
        {
            get
            {
                if (_SkyberryUsers == null)
                {
                    _SkyberryUsers = new SkyberryUserRepository(DbContext, Cache);
                }
                return _SkyberryUsers;
            }
        }

        private TagRepository _Tags;
        public ITagRepository Tags
        {
            get
            {
                if (_Tags == null)
                {
                    _Tags = new TagRepository(DbContext, Cache);
                }
                return _Tags;
            }
        }

        private TestimonialRepository _Testimonials;
        public ITestimonialRepository Testimonials
        {
            get
            {
                if (_Testimonials == null)
                {
                    _Testimonials = new TestimonialRepository(DbContext, Cache);
                }
                return _Testimonials;
            }
        }









        private CounterRepository _Counters;
        public ICounterRepository Counters
        {
            get
            {
                if (_Counters == null)
                {
                    _Counters = new CounterRepository(DbContext, Cache);
                }
                return _Counters;
            }
        }







        public UnitOfWork()
        {
            System.Diagnostics.Debug.WriteLine("UOW Create");
            CreateDbContext();
        }

        public void Commit()
        {
            System.Diagnostics.Debug.WriteLine("UOW Commit");
            DbContext.SaveChanges();
        }


        protected void CreateDbContext()
        {
            DbContext = new SkyberryContext();

            // Do NOT enable proxied entities, else serialization fails
            DbContext.Configuration.ProxyCreationEnabled = false;

            // Load navigation properties explicitly (avoid serialization trouble)
            DbContext.Configuration.LazyLoadingEnabled = false;

            Cache = new DefaultCacheProvider();
        }

        public SkyberryContext DbContext { get; set; }
        protected ICacheProvider Cache { get; set; }

        #region IDisposable

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (DbContext != null)
                {
                    System.Diagnostics.Debug.WriteLine("UOW Dispose");

                    DbContext.Dispose();
                }
            }
        }

        #endregion

    }
}