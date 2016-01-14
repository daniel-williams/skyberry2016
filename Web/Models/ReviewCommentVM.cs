using System;

namespace Web.Models
{
    public class ReviewCommentVM
    {
        public string Id { get; set; }
        public string Comment { get; set; }
        public DateTime Created { get; set; }
        public Guid OId { get; set; }
        public Guid UId { get; set; }
        public string UName { get; set; }
        public Guid RId { get; set; }
    }
}
