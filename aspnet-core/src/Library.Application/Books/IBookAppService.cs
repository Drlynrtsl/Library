using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Library.Books.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Books
{
    public interface IBookAppService :IAsyncCrudAppService<BookDto, int, PagedBookResultRequestDto, CreateBookDto, BookDto>
    {
        Task<PagedResultDto<BookDto>> GetAllAsync(PagedBookResultRequestDto input);
        Task<List<BookDto>> GetAllAvailableBooks();
        Task<List<BookDto>> GetAllBooks();
    }
}
