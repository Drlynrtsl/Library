using Abp.AutoMapper;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Students.Dto
{
    [AutoMapTo(typeof(Student))]
    public class CreateStudentDto
    {
        [Required]
        public string StudentName { get; set; }
        [Required]
        public string StudentContactNumber { get; set; }
        [Required]
        public string StudentEmail { get; set; }
        [Required]
        public int DepartmentId { get; set; }
    }
}
