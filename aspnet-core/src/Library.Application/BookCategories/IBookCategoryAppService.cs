using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Library.BookCategories.Dto;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.BookCategories
{
    public interface IBookCategoryAppService : IAsyncCrudAppService<BookCategoryDto, int, PagedBookCategoryResultRequestDto, CreateBookCategoryDto, BookCategoryDto>
    {
        Task<List<BookCategoryDto>> GetAllBookCategories();
        Task<PagedResultDto<BookCategoryDto>> GetAllAsync(PagedBookCategoryResultRequestDto input);
    }
}
