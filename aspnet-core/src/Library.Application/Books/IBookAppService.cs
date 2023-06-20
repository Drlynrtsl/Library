using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Library.Books.Dto;
using Library.Borrowers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Books
{
    public interface IBookAppService :IAsyncCrudAppService<BookDto, int, PagedBookResultRequestDto, CreateBookDto, BookDto>
    {
        Task<PagedResultDto<BookDto>> GetAllBookAsync(PagedBookResultRequestDto input);
        Task<List<BookDto>> GetAllAvailableBooks();
        Task<BookDto> GetUpdatedBookTitleFromBorrower(EntityDto<int> input);
    }
}
