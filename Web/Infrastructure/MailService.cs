using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Configuration;

namespace Web.Infrastructure
{
    public static class MailService
    {

        public static bool SendForm(string from, string subject, IDictionary<string, string> data)
        {
            StringBuilder body = new StringBuilder();
            body.Append(GetFormHeader());
            foreach(var item in data)
            {
                body.Append(GetNameValueRow(item.Key, item.Value));
            }
            body.Append(GetFormFooter());

            return MailService.sendEmail(from, subject, body.ToString());
        }

        private static string GetFormHeader()
        {
            return "<table cellpadding='3' border='0'>";
        }
        private static string GetNameValueRow(string name, string val)
        {
            return string.Format("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", name, val);
        }
        private static string GetFormFooter()
        {
            StringBuilder footer = new StringBuilder();

            footer.Append(GetNameValueRow("Users IP", GetUserIP()));
            footer.Append(GetNameValueRow("Timestamp", DateTime.UtcNow.ToString("MM/dd/yyyy @ h:mm tt") + " GMT"));
            footer.Append("</table>");

            return footer.ToString();
        }


        public static bool sendEmail(string from, string subject, string body)
        {
            MailMessage message = new MailMessage();
            message.From = from == null
                ? new MailAddress("no-reply@skyberrystudio.com", "No Email Address")
                : new MailAddress(from);
            message.To.Add(new MailAddress(WebConfigurationManager.AppSettings["SUBMISSIONS_EMAIL"]));
            message.Subject = subject;
            message.IsBodyHtml = true;
            message.Body = body.ToString();
            message.BodyEncoding = Encoding.UTF8;
            message.SubjectEncoding = Encoding.UTF8;


            SmtpClient SMTPServer = new SmtpClient(WebConfigurationManager.AppSettings["SMTP_HOST"]);
            SMTPServer.Port = Int16.Parse(WebConfigurationManager.AppSettings["SMTP_PORT"]);
            //SMTPServer.Credentials = new System.Net.NetworkCredential(WebConfigurationManager.AppSettings["SMTP_USERNAME"], WebConfigurationManager.AppSettings["SMTP_PASSWORD"]);

            // TODO djw: remove this prior to go-live
            message.Bcc.Add(WebConfigurationManager.AppSettings["DEBUG_EMAIL"]);

            try
            {
#if DEBUG
                string debugAddress = WebConfigurationManager.AppSettings["DEBUG_EMAIL"];
                if (!string.IsNullOrEmpty(debugAddress))
                {
                    message.To.Clear();
                    message.CC.Clear();
                    message.Bcc.Clear();
                    message.To.Add(debugAddress);
                }
#endif
                SMTPServer.Send(message);
                return true;
            }
            catch (Exception ex)
            {
#if DEBUG
                System.Diagnostics.Debug.WriteLine("Exception: " + ex.Message);
#endif
            }
            return false;
        }


        public static string GetUserIP()
        {
            HttpContext context = System.Web.HttpContext.Current;
            string ipList = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipList))
            {
                return ipList.Split(',')[0];
            }
            return context.Request.ServerVariables["REMOTE_ADDR"];
        }
    }
}