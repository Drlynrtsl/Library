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


        public override async Task<PagedResultDto<BookDto>> GetAllAsync(PagedBookResultRequestDto input)
        {
            var query = await _repository.GetAll()
                .Include(x => x.BookCategory)
                .Select(x => ObjectMapper.Map<BookDto>(x))
                .ToListAsync();

            return new PagedResultDto<BookDto>(query.Count(), query);
        }
    }
}
