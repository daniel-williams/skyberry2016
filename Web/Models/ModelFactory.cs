using Skyberry.Core;
using Skyberry.Domain;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http.Routing;

namespace Web.Models
{
    public class ModelFactory
    {
        private UrlHelper _UrlHelper;
        private ApplicationUserManager _AppUserManager;

        public ModelFactory(HttpRequestMessage request, ApplicationUserManager appUserManager)
        {
            _UrlHelper = new UrlHelper(request);
            _AppUserManager = appUserManager;
        }

        public UserVM CreateUserVM(SkyberryUser item, IList<string> roles)
        {
            return new UserVM
            {
                Id = item.Id,
                Username = item.UserName,
                FirstName = item.FirstName,
                LastName = item.LastName,
                Email = item.Email,
                EmailConfirmed = item.EmailConfirmed,
                Title = item.Title,

                Roles = roles,
                Contacts = item.Contacts.Select(e => this.CreateContactVM(e)).ToList(),
            };
        }

        public ContactVM CreateContactVM(Contact item)
        {
            return new ContactVM
            {
                Id = item.Id,
                Data = item.ContactData,
                Type = item.ContactType,
            };
        }

        public AccountVM CreateAccountVM(Account item)
        {
            return new AccountVM
            {
                Id = item.Id,
                Name = item.Name,
                Slug = SlugUtils.ToSlug(item.Name),

                Projects = item.Projects.OrderByDescending(e => e.CreatedDate).Select(e => this.CreateProjectListVM(e)).ToList(),
            };
        }

        public AccountDetailsVM CreateAccountDetailsVM(Account item)
        {
            return new AccountDetailsVM
            {
                Id = item.Id,

                Invoices = item.Invoices.OrderByDescending(e => e.CreatedDate).Select(e => this.CreateInvoiceListVM(e)).ToList(),
                Payments = item.Payments.OrderByDescending(e => e.CreatedDate).Select(e => this.CreatePaymentListVM(e)).ToList(),
            };
        }
        public InvoiceListVM CreateInvoiceListVM(Invoice item)
        {
            return new InvoiceListVM
            {
                Id = item.Id,

                FilenameOriginal = item.FilenameOriginal,
                InvoiceNumber = item.InvoiceNumber,
                Amount = item.Amount,
                SentDate = item.SentDate,
                DueDate = item.DueDate,
                IsEstimate = item.IsEstimate,
            };
        }
        public PaymentListVM CreatePaymentListVM(Payment item)
        {
            return new PaymentListVM
            {
                Id = item.Id,

                Amount = item.Amount,
                PaymentType = item.PaymentType,
                PaymentDate = item.PaymentDate,
            };
        }

        public ProjectListVM CreateProjectListVM(Project item)
        {
            return new ProjectListVM
            {
                Id = item.Id,
                Name = item.Name,
                Slug = SlugUtils.ToSlug(item.Name),
                Status = item.Status,
            };
        }

        public ProjectVM CreateProjectVM(Project item)
        {
            return new ProjectVM
            {
                Id = item.Id,
                Name = item.Name,
                Slug = SlugUtils.ToSlug(item.Name),
                Description = item.Description,
                Status = item.Status,
                StartDate = item.StartDate,
                EstimatedCompletionDate = item.EstimatedCompletionDate,
                CompletionDate = item.CompletionDate,
                AccountId = item.AccountId,

                Contracts = item.Contracts.OrderByDescending(e => e.CreatedDate).Select(e => this.CreateContractVM(e)).ToList(),
                Reviews = item.DesignReviews.OrderByDescending(e => e.CreatedDate).ThenByDescending(e => e.Title).Select(e => this.CreateDesignReviewVM(e)).ToList(),
                Docs = item.ProjectDocuments.OrderByDescending(e => e.CreatedDate).Select(e => this.CreateProjectDocumentVM(e)).ToList(),
            };
        }

        public ContractVM CreateContractVM(Contract item)
        {
            return new ContractVM
            {
                Id = item.Id,
                Title = item.Title,
                Slug = SlugUtils.ToSlug(item.Title),
                Number = item.Number,
                CreatedDate = item.CreatedDate,

                Docs = item.ContractDocuments.OrderByDescending(e=>e.CreatedDate).Take(1).Select(e=>this.CreateContractDocumentVM(e)).ToList(),
            };
        }

        public ImageVM CreateImageVM(Image item)
        {
            return new ImageVM
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                Version = item.Version,
                Filename = item.Filename,
                FilenameOriginal = item.FilenameOriginal,
                FileExt = item.FileExt,
                FilePath = item.FilePath,

                Height = item.Height,
                Width = item.Width,
            };
        }

        private ContractDocumentVM CreateContractDocumentVM(ContractDocument item)
        {
            return new ContractDocumentVM
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                Version = item.Version,
                Filename = item.Filename,
                FilenameOriginal = item.FilenameOriginal,
                FileExt = item.FileExt,
                FilePath = item.FilePath,

                DocType = item.DocType,
            };
        }

        public DesignReviewVM CreateDesignReviewVM(DesignReview item)
        {
            return new DesignReviewVM
            {
                Id = item.Id,
                Title = item.Title,
                Slug = SlugUtils.ToSlug(item.Title),
                Description = item.Description,
                CreatedDate = item.CreatedDate,
                //Docs = item.ReviewDocuments.OrderByDescending(e => e.CreatedDate).Select(e => this.createReviewDocumentVM(e)).ToList(),
                Options = item.ReviewDocuments.Where(e=>e.DocType == null).OrderByDescending(e => e.CreatedDate).Select(e => this.CreateReviewDocumentVM(e)).ToList(),
                Proofs = item.ReviewDocuments.Where(e => e.DocType == "Proof").OrderByDescending(e => e.CreatedDate).Select(e => this.CreateReviewDocumentVM(e)).ToList(),
                IsActive = item.IsActive,

                SelectedId = item.SelectedReviewDocumentId,
                SelectedComment = item.SelectedComment,
                AdditionalComment = item.AdditionalComment,
                Comments = item.ReviewComments.OrderByDescending(e => e.Created).Select(e => this.CreateReviewCommentVM(e)).ToList(),

                RequestById = item.RequestById,
                RequestByName = item.RequestByName,
                RequestType = item.RequestType,
                RequestDate = item.RequestDate,

                ApprovedById = item.ApprovedById,
                ApprovedByName = item.ApprovedByName,
                ApprovedDate = item.ApprovedDate,

                AcceptedDate = item.AcceptedDate,
            };
        }

        public ProjectDocumentVM CreateProjectDocumentVM(ProjectDocument item)
        {
            return new ProjectDocumentVM
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                Version = item.Version,
                CreatedDate = item.CreatedDate,
                Filename = item.Filename,
                FilenameOriginal = item.FilenameOriginal,
                FileExt = item.FileExt,
                FilePath = item.FilePath,

                DocType = item.DocType,
            };
        }

        public ReviewCommentVM CreateReviewCommentVM(ReviewComment item)
        {
            return new ReviewCommentVM
            {
                id = item.Id,
                comment = item.Comment,
                created = item.Created,
                oId = item.OrderId,
                rId = item.DesignReviewId,
                uId = item.UserId,
                uName = item.Username,
            };
        }

        public ReviewDocumentVM CreateReviewDocumentVM(ReviewDocument item)
        {
            return new ReviewDocumentVM
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                Version = item.Version,
                CreatedDate = item.CreatedDate,
                Filename = item.Filename,
                FilenameOriginal = item.FilenameOriginal,
                FileExt = item.FileExt,
                FilePath = item.FilePath,

                DocType = item.DocType,
                Order = item.Order,
            };
        }
    }

    
}
