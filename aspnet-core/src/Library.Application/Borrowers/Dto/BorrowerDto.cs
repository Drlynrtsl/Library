using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Library.Books.Dto;
using Library.Entities;
using Library.Students.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Borrowers.Dto
{
    [AutoMapTo(typeof(Borrower))]
    [AutoMapFrom(typeof(Borrower))]
    public class BorrowerDto : EntityDto<int>
    {
        [Required]
        public DateTime BorrowDate { get; set; }
        [Required]
        public DateTime ExpectedReturnDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int BookId { get; set; }
        public BookDto Book { get; set; }
        public int StudentId { get; set; }
        public StudentDto Student { get; set; }
    }
}
