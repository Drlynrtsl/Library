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
        public BookAppService(IRepository<Book, int> repository) : base(repository)
        {
            _repository = repository;
        }


        public async Task<PagedResultDto<BookDto>> GetAllBookAsync(PagedBookResultRequestDto input)
        {
            var query = await _repository.GetAll()
                .Include(x => x.BookCategory)
                .Include(x => x.Author)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<BookDto>(x))
                .ToListAsync();

            return new PagedResultDto<BookDto>(query.Count(), query);
        }

        public async Task<List<BookDto>> GetAllAvailableBooks()
        {
           var query = await _repository.GetAll()
                .Select(x => ObjectMapper.Map<BookDto>(x))
                .ToListAsync();
                return query;            
        }

        public async Task<BookDto> GetUpdatedBookTitleFromBorrower(EntityDto<int> input)
        {
                var book = await GetAsync(input);

                if (book.IsBorrowed == true)
                {
                    book.IsBorrowed = false;
                }
                else
                {
                    book.IsBorrowed = true;
                }

                var updateBookIsBorrowed = await UpdateAsync(book);
                return updateBookIsBorrowed;

                
        }

        public override Task<BookDto> UpdateAsync(BookDto input)
        {
            return base.UpdateAsync(input);
        }
    }
}
