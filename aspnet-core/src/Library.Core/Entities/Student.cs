using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities
{
    public class Student : FullAuditedEntity<int>
    {
        public string StudentName { get; set; }
        public string StudentContactNumber { get; set; }
        public string StudentEmail { get; set; }
        public Department Department { get; set; }
    }
}
