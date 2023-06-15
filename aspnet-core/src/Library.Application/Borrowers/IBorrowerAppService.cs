using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Library.Books.Dto;
using Library.Borrowers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Borrowers
{
    public interface IBorrowerAppService : IAsyncCrudAppService<BorrowerDto, int, PagedBorrowerResultRequestDto, CreateBorrowerDto, BorrowerDto>
    {
        Task<BorrowerDto> CreateAsync(CreateBorrowerDto input);
        Task<PagedResultDto<BorrowerDto>> GetAllAsync(PagedBorrowerResultRequestDto input);
        Task<BorrowerDto> GetBorrowWithBookAndStudentUnderBookCategory(EntityDto<int> input);
        Task<List<BookDto>> GetAllBooksByStudentId(int id);
        Task<BorrowerDto> UpdateAsync(BorrowerDto input);
        Task<BorrowerDto> GetAsync(EntityDto<int> input);
        Task<BorrowerDto> UpdateIsBorrowedIfDeleted(BorrowerDto input);
    }
}
