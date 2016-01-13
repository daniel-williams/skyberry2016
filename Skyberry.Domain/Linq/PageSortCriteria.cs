using System;

namespace Skyberry.Domain.Linq
{
    public class PageSortCriteria
    {
        public PageSortCriteria()
        {
            Page = 1;
            ItemsPerPage = 20;
            Sort = String.Empty;
        }

        public int Page { get; set; }
        public int ItemsPerPage;
        public string Sort { get; set; }

        public bool IsSort(string sort)
        {
            string sortBy = Sort ?? "";

            string comp = sortBy.StartsWith("-") ? sortBy.Substring(1) : sortBy;
            return sort.ToLower() == comp.ToLower();
        }

        public string SortToogle(string sort)
        {
            string result = sort;
            if (IsSort(sort))
            {
                if (!string.IsNullOrWhiteSpace(Sort))
                {
                    if (Sort.StartsWith("-"))
                    {
                        result = Sort.Substring(1);
                    }
                    else
                    {
                        result = "-" + Sort;
                    }
                }
            }
            return result;
        }

        public string SortCss(string sort)
        {
            string result = "";
            if (IsSort(sort))
            {
                result = Sort.StartsWith("-") ? SORT_DESCENDING_CSS : SORT_ASCENDING_CSS;
            }
            return result;
        }

        private static string SORT_ASCENDING_CSS = "glyphicon glyphicon-chevron-up";
        private static string SORT_DESCENDING_CSS = "glyphicon glyphicon-chevron-down";
    }
}