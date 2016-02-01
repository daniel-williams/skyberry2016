using System.Text.RegularExpressions;

namespace Skyberry.Core
{
    public static class SlugUtils
    {
        private static Regex unSafeChars = new Regex(@"[^a-zA-Z0-9 _-]");
        private static Regex multiWhitespace = new Regex(@"\s+");
        private static Regex multiDash = new Regex("-+");
        private static Regex trimDashes = new Regex("^-|-$");
        private static Regex ampersandHtml = new Regex("&amp;");
        private static Regex ampersandChar = new Regex("&");

        public static string ToSlug(string val)
        {
            string result = val.Trim().ToLower();
            result = ampersandHtml.Replace(result, "and");
            result = ampersandChar.Replace(result, "and");
            result = unSafeChars.Replace(result, "-");
            result = multiWhitespace.Replace(result, "-");
            result = multiDash.Replace(result, "-");
            result = trimDashes.Replace(result, string.Empty);

            return result;
        }
    }
}
