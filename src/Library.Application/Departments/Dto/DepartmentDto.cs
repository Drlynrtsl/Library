using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Departments.Dto
{
    [AutoMapTo(typeof(Department))]
    [AutoMapFrom(typeof(Department))]
    public class DepartmentDto : EntityDto<int>
    {
        [Required]
        public string Name { get; set; }
    }
}
