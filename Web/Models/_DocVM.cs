using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public abstract class _DocVM
    {
        public Guid Id { get; set; }
        public string Filename { get; set; }
        public string FilenameOriginal { get; set; }

        [Display(Name = "Path")]
        public string FilePath { get; set; }

        [Display(Name = "Extension")]
        public string FileExt { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string Version { get; set; }

        [Display(Name = "Created Date")]
        public DateTime CreatedDate { get; set; }
    }
}
