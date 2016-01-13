using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skyberry.Admin.ViewModels
{
    public class ListOpts
    {

        private static IEnumerable<ListOpt> _IndustryTypeOpts = null;
        public static IEnumerable<ListOpt> IndustryTypeOpts
        {
            get
            {
                if (_IndustryTypeOpts == null)
                {
                    _IndustryTypeOpts = new[] {
                        new ListOpt { Id = "", Value = "none" },
                        new ListOpt { Id = "Arts & Crafts", Value = "Arts & Crafts" },
                        new ListOpt { Id = "Automotive", Value = "Automotive" },
                        new ListOpt { Id = "Construction", Value = "Construction" },
                        new ListOpt { Id = "Consulting", Value = "Consulting" },
                        new ListOpt { Id = "Entertainment", Value = "Entertainment" },
                        new ListOpt { Id = "Financial & Insurance", Value = "Financial & Insurance" },
                        new ListOpt { Id = "Food & Beverage", Value = "Food & Beverage" },
                        new ListOpt { Id = "Home & Garden", Value = "Home & Garden" },
                        new ListOpt { Id = "Internet", Value = "Internet" },
                        new ListOpt { Id = "Legal", Value = "Legal" },
                        new ListOpt { Id = "Manufacturing & Wholesale", Value = "Manufacturing & Wholesale" },
                        new ListOpt { Id = "Medical & Dental", Value = "Medical & Dental" },
                        new ListOpt { Id = "Non-Profit", Value = "Non-Profit" },
                        new ListOpt { Id = "Real Estate", Value = "Real Estate" },
                        new ListOpt { Id = "Religious", Value = "Religious" },
                        new ListOpt { Id = "Retail", Value = "Retail" },
                        new ListOpt { Id = "Service Industries", Value = "Service Industries" },
                        new ListOpt { Id = "Sports & Recreation", Value = "Sports & Recreation" },
                        new ListOpt { Id = "Technology", Value = "Technology" },
                        new ListOpt { Id = "Travel & Hospitality", Value = "Travel & Hospitality" },

                    };
                }

                return _IndustryTypeOpts;
            }
        }


        private static IEnumerable<ListOpt> _PaymentTypeOpts = null;
        public static IEnumerable<ListOpt> PaymentTypeOpts
        {
            get
            {
                if (_PaymentTypeOpts == null)
                {
                    _PaymentTypeOpts = new[] {
                        new ListOpt { Id = "", Value = "none" },
                        new ListOpt { Id = "Check", Value = "Check" },
                        new ListOpt { Id = "PayPal", Value = "PayPal" },
                        new ListOpt { Id = "ACH (Direct Deposit)", Value = "ACH (Direct Deposit)" },
                        new ListOpt { Id = "Authorize.Net", Value = "Authorize.Net" },
                        new ListOpt { Id = "Logo Tournament", Value = "Logo Tournament" },
                        new ListOpt { Id = "Wire Transfer", Value = "Wire Transfer" },
                    };
                }

                return _PaymentTypeOpts;
            }
        }


        private static IEnumerable<ListOpt> _AddressTypeOpts = null;
        public static IEnumerable<ListOpt> AddressTypeOpts
        {
            get
            {
                if (_AddressTypeOpts == null)
                {
                    _AddressTypeOpts = new[] {
                        new ListOpt { Id = "", Value = "none" },
                        new ListOpt { Id = "Billing", Value = "Billing" },
                        new ListOpt { Id = "Shipping", Value = "Shipping" },
                        new ListOpt { Id = "Mailing", Value = "Mailing" },
                        new ListOpt { Id = "Home", Value = "Home" },
                        new ListOpt { Id = "Office", Value = "Office" },
                    };
                }

                return _AddressTypeOpts;
            }
        }


        private static IEnumerable<ListOpt> _ContactTypeOpts = null;
        public static IEnumerable<ListOpt> ContactTypeOpts
        {
            get
            {
                if (_ContactTypeOpts == null)
                {
                    _ContactTypeOpts = new[] {
                        new ListOpt { Id = "", Value = "none" },
                        new ListOpt { Id = "Phone (Primary)", Value = "Phone (Primary)" },
                        new ListOpt { Id = "Phone (Secondary)", Value = "Phone (Secondary)" },
                        new ListOpt { Id = "Email", Value = "Email" },
                        new ListOpt { Id = "Website", Value = "Website" },
                        new ListOpt { Id = "Phone (Mobile)", Value = "Phone (Mobile)" },
                        new ListOpt { Id = "Pinterest", Value = "Pinterest" },
                        new ListOpt { Id = "Facebook", Value = "Facebook" },
                        new ListOpt { Id = "Twitter", Value = "Twitter" },
                        new ListOpt { Id = "LinkedIn", Value = "LinkedIn" },
                        new ListOpt { Id = "Google+", Value = "Google+" },
                        new ListOpt { Id = "Fax", Value = "Fax" },
                    };
                }

                return _ContactTypeOpts;
            }
        }



        private static IEnumerable<ListOpt> _ProjectDocumentTypeOpts = null;
        public static IEnumerable<ListOpt> ProjectDocumentTypeOpts
        {
            get
            {
                if (_ProjectDocumentTypeOpts == null)
                {
                    _ProjectDocumentTypeOpts = new[] {
                        new ListOpt { Id = "", Value = "none" },
                        new ListOpt { Id = "Design Guideline", Value = "Design Guideline" },
                        new ListOpt { Id = "Color Guideline", Value = "Color Guideline" },
                        new ListOpt { Id = "Proof Approval", Value = "Proof Approval" },
                        new ListOpt { Id = "Blank Form", Value = "Blank Form" },
                        new ListOpt { Id = "Design Review", Value = "Design Review" },
                        new ListOpt { Id = "Proofs", Value = "Proofs" },
                        new ListOpt { Id = "Consultation Form", Value = "Consultation Form" },
                        new ListOpt { Id = "Final Deliverables", Value = "Final Deliverables" },
                        new ListOpt { Id = "Receipt", Value = "Receipt" },
                        new ListOpt { Id = "Informational Doc", Value = "Informational Doc" },
                    };
                }

                return _ProjectDocumentTypeOpts;
            }
        }


        private static IEnumerable<ListOpt> _ContractDocumentTypeOpts = null;
        public static IEnumerable<ListOpt> ContractDocumentTypeOpts
        {
            get
            {
                if (_ContractDocumentTypeOpts == null)
                {
                    _ContractDocumentTypeOpts = new[] {
                        new ListOpt { Id = "", Value = "none" },
                        new ListOpt { Id = "Initial", Value = "Initial" },
                        new ListOpt { Id = "Client Changes", Value = "Client Changes" },
                        new ListOpt { Id = "Skyberry Changes", Value = "Skyberry Changes" },
                        new ListOpt { Id = "Final Signed", Value = "Final Signed" },
                    };
                }

                return _ContractDocumentTypeOpts;
            }
        }

        private static IEnumerable<ListOpt> _ReviewDocumentTypeOpts = null;
        public static IEnumerable<ListOpt> ReviewDocumentTypeOpts
        {
            get
            {
                if (_ReviewDocumentTypeOpts == null)
                {
                    _ReviewDocumentTypeOpts = new[] {
                        new ListOpt { Id = "Design Option", Value = "Design Option" },
                        new ListOpt { Id = "Proof", Value = "Proof" },
                    };
                }

                return _ReviewDocumentTypeOpts;
            }
        }




        private static IEnumerable<ListOpt> _CountryOpts = null;
        public static IEnumerable<ListOpt> CountryOpts
        {
            get
            {
                if (_CountryOpts == null)
                {
                    _CountryOpts = new[] {
                        new ListOpt { Id = "", Value = "none" },
                        new ListOpt { Id = "United States", Value = "United States" },
                        new ListOpt { Id = "Canada", Value = "Canada" },
                        new ListOpt { Id = "Mexico", Value = "Mexico" },
                        new ListOpt { Id = "Singapore", Value = "Singapore" },
                    };
                }

                return _CountryOpts;
            }
        }
    }

    public class ListOpt
    {
        public string Id { get; set; }
        public string Value { get; set; }
    }
}
