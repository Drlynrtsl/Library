using Abp.AutoMapper;
using Library.BookCategories.Dto;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Books.Dto
{
    [AutoMapTo(typeof(Book))]
    public class CreateBookDto
    {
        [Required]
        public string BookTitle { get; set; }
        [Required]
        public string BookPublisher { get; set; }
        [Required]
        public string BookAuthor { get; set; }
        [Required]
        public bool IsBorrowed { get; set; }
        [Required]
        public int BookCategoryId { get; set; }
    }
}
