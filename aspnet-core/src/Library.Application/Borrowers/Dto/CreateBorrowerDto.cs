using Abp.AutoMapper;
using Library.Books.Dto;
using Library.Entities;
using Library.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Borrowers.Dto
{
    [AutoMapTo(typeof(Borrower))]
    public class CreateBorrowerDto
    {
        public DateTime BorrowDate { get; set; }
        public DateTime ExpectedReturnDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public int BookId { get; set; }
        public int StudentId { get; set; }
    }
}
