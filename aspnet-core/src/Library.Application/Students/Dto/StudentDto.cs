using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Library.Departments.Dto;
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
    [AutoMapFrom(typeof(Student))]
    public class StudentDto : EntityDto<int>
    {
        public string StudentName { get; set; }
        public string StudentContactNumber { get; set; }
        public string StudentEmail { get; set; }
        public int DepartmentId { get; set; }
        public DepartmentDto Department { get; set; }
    }
}
