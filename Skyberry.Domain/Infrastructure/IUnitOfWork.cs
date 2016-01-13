using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skyberry.Domain
{
    public interface IUnitOfWork : IDisposable
    {
        SkyberryContext DbContext { get; }

        IAccoladeRepository Accolades { get; }
        IAccountRepository Accounts { get; }
        IAddressRepository Addresses { get; }
        IContactRepository Contacts { get; }
        IContractRepository Contracts { get; }
        IContractDocumentRepository ContractDocuments { get; }
        IDesignReviewRepository DesignReviews { get; }
        IDocumentRepository Documents { get; }
        IImageRepository Images { get; }
        IImageSetRepository ImageSets { get; }
        IImageSetItemRepository ImageSetItems { get; }
        IInvoiceRepository Invoices { get; }
        IPaymentRepository Payments { get; }
        IProjectRepository Projects { get; }
        IProjectDocumentRepository ProjectDocuments { get; }
        IReviewDocumentRepository ReviewDocuments { get; }
        ISkyberryUserRepository SkyberryUsers { get; }
        ITagRepository Tags { get; }
        ITestimonialRepository Testimonials { get; }

        ICounterRepository Counters { get; }

        void Commit();
    }
}
