using Abp.Application.Services;
using Abp.Domain.Repositories;
using Library.BookCategories.Dto;
using Library.Entities;
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
    }
}
