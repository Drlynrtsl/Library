using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Library.Books.Dto;
using Library.Borrowers.Dto;
using Library.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Borrowers
{
    public class BorrowerAppService : AsyncCrudAppService<Borrower, BorrowerDto, int, PagedBorrowerResultRequestDto, CreateBorrowerDto, BorrowerDto>
    {
        private readonly IRepository<Borrower, int> _repository;
        private readonly IRepository<Book, int> _bookRepository;
        private readonly IRepository<Student, int> _studentRepository;
        public BorrowerAppService(IRepository<Borrower, int> repository) : base(repository)
        {
            _repository = repository;   
        }

        public override async Task<PagedResultDto<BorrowerDto>> GetAllAsync(PagedBorrowerResultRequestDto input)
        {
            var query = await _repository.GetAll()
            .Include(x => x.Book)
            .Include(x => x.Student)
            .Select( x => ObjectMapper.Map<BorrowerDto>(x))
            .ToListAsync();

            return new PagedResultDto<BorrowerDto>(query.Count(), query);
        }

        public async Task<List<BookDto>> GetAllBooksByStudentId(int id)
        {
            var student = _studentRepository.GetAll()
                .Include(x => x.Department)
                .Where(x => x.Id == id)
                .FirstOrDefault();

            var books = _bookRepository
                .GetAllIncluding(x => x.BookCategory, x => x.BookCategory.Department)
                .Where(x => x.BookCategory.DepartmentId == student.DepartmentId && !x.IsBorrowed)
                .ToList();

            return ObjectMapper.Map<List<BookDto>>(books);
        }

    }
}
