using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Library.Authors.Dto;
using Library.BookCategories.Dto;
using Library.Entities;

namespace Library.Books.Dto
{
    [AutoMapTo(typeof(Book))]
    [AutoMapFrom(typeof(Book))]
    public class BookDto : EntityDto<int>
    {
        public string BookTitle { get; set; }
        public string BookPublisher { get; set; }
        public int AuthorId { get; set; }
        public AuthorDto Author { get; set; }
        public bool IsBorrowed { get; set; }
        public int BookCategoryId { get; set; }
        public BookCategoryDto BookCategory { get; set; }
    }
}
