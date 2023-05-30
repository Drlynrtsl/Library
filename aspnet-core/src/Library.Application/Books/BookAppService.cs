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

namespace Library.Books
{
    public class BookAppService : AsyncCrudAppService<Book, BookDto, int, PagedBookResultRequestDto, CreateBookDto, BookDto>, IBookAppService
    {
        private readonly IRepository<Book, int> _repository;
        private readonly IRepository<Student, int> _studentRepository;
        public BookAppService(IRepository<Book, int> repository, IRepository<Student, int> studentRepository) : base(repository)
        {
            _repository = repository;
            _studentRepository = studentRepository;
        }


        public override async Task<PagedResultDto<BookDto>> GetAllAsync(PagedBookResultRequestDto input)
        {
            var query = await _repository.GetAll()
                .Include(x => x.BookCategory)
                .Select(x => ObjectMapper.Map<BookDto>(x))
                .ToListAsync();

            return new PagedResultDto<BookDto>(query.Count(), query);
        }

        public async Task<List<BookDto>> GetAllAvailableBooks()
        {
           var query = await _repository.GetAll()
                .Include(x => x.BookCategory)
                .Where(x => !x.IsBorrowed)
                .Select(x => ObjectMapper.Map<BookDto>(x))
                .ToListAsync();
                return query;            
        }

        public async Task<List<BookDto>> GetAllBooks()
        {
            var query = await _repository.GetAll()
                 .Include(x => x.BookCategory)
                 .Select(x => ObjectMapper.Map<BookDto>(x))
                 .ToListAsync();
            return query;

        }

    }
}
