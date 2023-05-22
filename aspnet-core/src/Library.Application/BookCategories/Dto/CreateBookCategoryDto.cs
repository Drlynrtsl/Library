using Abp.AutoMapper;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.BookCategories.Dto
{
    [AutoMapTo(typeof(BookCategory))]
    public class CreateBookCategoryDto 
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int DepartmentId { get; set; }
    }
}
