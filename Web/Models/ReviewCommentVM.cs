using System;

namespace Web.Models
{
    public class ReviewCommentVM
    {
        public string id { get; set; }
        public string comment { get; set; }
        public DateTime created { get; set; }
        public Guid oId { get; set; }
        public Guid uId { get; set; }
        public string uName { get; set; }
        public Guid rId { get; set; }
    }
}
