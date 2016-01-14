using Skyberry.Domain;
using System.Net.Http;
using System.Web.Http.Routing;
using System.Linq;
using System.Data.Entity;
using System;
using System.Collections.Generic;

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

        public AccountVM CreateAccountVM(Account acct)
        {
            return new AccountVM
            {
                Id = acct.Id,
                Name = acct.Name,
                Projects = acct.Projects.Select(e => this.CreateProjectListVM(e)).ToList()
            };
        }

        public ProjectListVM CreateProjectListVM(Project prj)
        {
            return new ProjectListVM
            {
                Id = prj.Id,
                Name = prj.Name,
                Status = prj.Status,
            };
        }

        public ProjectVM CreateProjectVM(Project prj)
        {
            return new ProjectVM
            {
                Id = prj.Id,
                Name = prj.Name,
                Description = prj.Description,
                Status = prj.Status,
                EstimatedCompletionDate = prj.EstimatedCompletionDate,
                CompletionDate = prj.CompletionDate,
                AccountId = prj.AccountId,

                Contracts = prj.Contracts.Select(e => this.CreateContractVM(e)).ToList(),
                Reviews = prj.DesignReviews.Select(e => this.createDesignReviewVM(e)).ToList(),
                Docs = prj.ProjectDocuments.Select(e=>this.createProjectDocumentVM(e)).ToList(),
            };
        }

        public ContractVM CreateContractVM(Contract item)
        {
            return new ContractVM
            {
                Id = item.Id,
                Title = item.Title,
                Number = item.Number,
                CreatedDate = item.CreatedDate,

                Docs = item.ContractDocuments.OrderByDescending(e=>e.CreatedDate).Take(1).Select(e=>this.createContractDocumentVM(e)).ToList(),
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

        private ContractDocumentVM createContractDocumentVM(ContractDocument item)
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

        public DesignReviewVM createDesignReviewVM(DesignReview item)
        {
            return new DesignReviewVM
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                CreatedDate = item.CreatedDate,
                Docs = item.ReviewDocuments.Select(e=>this.createReviewDocumentVM(e)).ToList(),
                IsActive = item.IsActive,

                SelectedId = item.SelectedReviewDocumentId,
                SelectedComment = item.SelectedComment,
                AdditionalComment = item.AdditionalComment,
                Comments = item.ReviewComments.Select(e=>this.createReviewCommmentVM(e)).ToList(),

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

        public ProjectDocumentVM createProjectDocumentVM(ProjectDocument item)
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

        public ReviewCommentVM createReviewCommmentVM(ReviewComment item)
        {
            return new ReviewCommentVM
            {
                Id = item.Id,
                Comment = item.Comment,
                Created = item.Created,
                OId = item.OrderId,
                RId = item.DesignReviewId,
                UId = item.UserId,
                UName = item.Username,
            };
        }

        public ReviewDocumentVM createReviewDocumentVM(ReviewDocument item)
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
