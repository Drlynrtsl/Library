using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Library.Authors.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Authors
{
    public interface IAuthorAppService : IAsyncCrudAppService <AuthorDto, int, PagedAuthorResultRequestDto, CreateAuthorDto, AuthorDto>
    {
        Task<List<AuthorDto>> GetAllAuthors();
        Task<PagedResultDto<AuthorDto>> GetAllAsync(PagedAuthorResultRequestDto input);
        Task<AuthorDto> GetAsync(EntityDto<int> input);
    }
}
