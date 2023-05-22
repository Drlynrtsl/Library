using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Library.Departments.Dto;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.BookCategories.Dto
{
    [AutoMapTo(typeof(BookCategory))]
    [AutoMapFrom(typeof(BookCategory))]
    public class BookCategoryDto : EntityDto<int>
    {
        public string Name { get; set; }
        public int DepartmentId { get; set; }
        public DepartmentDto Department { get; set; }
    }
}
