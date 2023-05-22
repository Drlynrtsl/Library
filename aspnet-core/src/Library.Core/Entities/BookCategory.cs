using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities
{
    public class BookCategory : FullAuditedEntity<int>
    {
        public string Name { get; set; }
        public int? DepartmentId { get; set; }
        public Department Department { get; set; } 
    }
}
