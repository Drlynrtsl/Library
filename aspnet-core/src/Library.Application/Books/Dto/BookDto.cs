using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Library.BookCategories.Dto;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Books.Dto
{
    [AutoMapTo(typeof(Book))]
    [AutoMapFrom(typeof(Book))]
    public class BookDto : EntityDto<int>
    {
        public string BookTitle { get; set; }
        public string BookPublisher { get; set; }
        public string BookAuthor { get; set; }
        public bool IsBorrowed { get; set; }
        public int BookCategoryId { get; set; }
        public BookCategoryDto BookCategory { get; set; }
    }
}
