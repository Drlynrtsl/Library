using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Library.BookCategories.Dto;
using Library.Departments.Dto;
using Library.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.BookCategories
{
    public class BookCategoryAppService : AsyncCrudAppService<BookCategory, BookCategoryDto, int, PagedBookCategoryResultRequestDto, CreateBookCategoryDto, BookCategoryDto>, IBookCategoryAppService
    {
        private readonly IRepository<BookCategory, int> _repository;
        public BookCategoryAppService(IRepository<BookCategory, int> repository) : base(repository)
        {
            _repository = repository;
        }
        public async Task<List<BookCategoryDto>> GetAllBookCategories()
        {
            var query = await _repository.GetAllListAsync();
            return ObjectMapper.Map<List<BookCategoryDto>>(query);
        }

        public override async Task<PagedResultDto<BookCategoryDto>>GetAllAsync(PagedBookCategoryResultRequestDto input)
        {
            var query = await _repository.GetAll()
                .Include( x=>x.Department)
                .Select( x => ObjectMapper.Map<BookCategoryDto>(x))
                .ToListAsync();

            return new PagedResultDto<BookCategoryDto>(query.Count(), query);
        }
    }
}
