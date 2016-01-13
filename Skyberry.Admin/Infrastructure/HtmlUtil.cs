using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Skyberry.Admin.Infrastructure
{
    public static class HtmlUtil
    {
        private static Regex slugRgx = new Regex("[^a-zA-Z0-9 _-]");

        public static string SanitizeSlug(string slug)
        {
            return slugRgx.Replace(slug.Trim().ToLower(), "").Replace(' ', '-');
        }

        public static string GetUserIP()
        {
            System.Web.HttpContext context = System.Web.HttpContext.Current;

            string ipList = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipList))
            {
                return ipList.Split(',')[0];
            }

            return context.Request.ServerVariables["REMOTE_ADDR"];
        }

        public static string GetDomain(Uri uri)
        {
            //Uri uri = context.Request.Url;
            string host = uri.Scheme + Uri.SchemeDelimiter + uri.Host;

            if (uri.Port != 80 && uri.Port != 443)
            {
                host += ":" + uri.Port;
            }

            return host;
        }

        public static String TitleCaseString(String s)
        {
            if (s == null) return s;

            s = s.Replace("_", " ").Replace("-", " ");

            String[] words = s.Split(' ');
            for (int i = 0; i < words.Length; i++)
            {
                if (words[i].Length == 0) continue;

                Char firstChar = Char.ToUpper(words[i][0]);
                String rest = "";
                if (words[i].Length > 1)
                {
                    rest = words[i].Substring(1).ToLower();
                }
                words[i] = firstChar + rest;
            }
            return String.Join(" ", words);
        }

        public static string DisplayAddress(Address a)
        {
            string result = "";

            if (a != null)
            {
                string temp = "";
                string location = "";

                temp = a.Line1;
                if (!string.IsNullOrEmpty(temp))
                {
                    location = temp;
                }

                temp = a.Line2;
                if (!string.IsNullOrEmpty(temp))
                {
                    if (!string.IsNullOrEmpty(location))
                    {
                        location += "<br />";
                    }
                    location += temp;
                }

                temp = a.Line3;
                if (!string.IsNullOrEmpty(temp))
                {
                    if (!string.IsNullOrEmpty(location))
                    {
                        location += "<br />";
                    }
                    location += temp;
                }

                temp = a.Line4;
                if (!string.IsNullOrEmpty(temp))
                {
                    if (!string.IsNullOrEmpty(location))
                    {
                        location += "<br />";
                    }
                    location += temp;
                }

                if (!string.IsNullOrEmpty(location))
                {
                    location += "<br />";
                }

                temp = a.Locality;
                if (!string.IsNullOrEmpty(temp))
                {
                    location += temp;
                }

                temp = a.Region;
                if (!string.IsNullOrEmpty(temp))
                {
                    if (!string.IsNullOrEmpty(location))
                    {
                        location += ", ";
                    }
                    location += temp;
                }

                temp = a.PostCode;
                if (!string.IsNullOrEmpty(temp))
                {
                    if (!string.IsNullOrEmpty(location))
                    {
                        location += ", ";
                    }
                    location += temp;
                }

                if (!string.IsNullOrEmpty(location))
                {
                    result = location;
                }
            }

            return result;
        }
    }
}