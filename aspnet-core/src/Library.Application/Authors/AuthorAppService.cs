using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Library.Authors.Dto;
using Library.BookCategories.Dto;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Authors
{
    public class AuthorAppService : AsyncCrudAppService<Author, AuthorDto, int, PagedAuthorResultRequestDto, CreateAuthorDto, AuthorDto>, IAuthorAppService
    {
        private readonly IRepository<Author, int> _repository;
        public AuthorAppService(IRepository<Author, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<PagedResultDto<AuthorDto>> GetAllAsync(PagedAuthorResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<AuthorDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }
        public async Task<List<AuthorDto>> GetAllAuthors()
        {
            var query = await _repository.GetAllListAsync();
            return ObjectMapper.Map<List<AuthorDto>>(query);
        }
    }
}
