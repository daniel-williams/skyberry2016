using System;

namespace Skyberry.Domain.Linq
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
    public class FieldMapAttribute : Attribute
    {
        public string Field { get; set; }
        public FieldMapAttribute(string field)
        {
            Field = field;
        }
    }
}
