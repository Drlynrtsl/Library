using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Library.Departments.Dto;
using Library.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Collections.Extensions;
using Abp.Extensions;
using Abp.Linq.Extensions;

namespace Library.Departments
{
    public class DepartmentAppService : AsyncCrudAppService<Department, DepartmentDto, int, PagedDepartmentResultRequestDto, CreateDepartmentDto, DepartmentDto>, IDepartmentAppService
    {
        private readonly IRepository<Department, int> _repository;
        public DepartmentAppService(IRepository<Department, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<PagedResultDto<DepartmentDto>> GetAllAsync(PagedDepartmentResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public async Task<List<DepartmentDto>> GetAllDepartments()
        {
            var query = await _repository.GetAllListAsync();
            return ObjectMapper.Map<List<DepartmentDto>>(query);
        }

        protected override IQueryable<Department> CreateFilteredQuery(PagedDepartmentResultRequestDto input)
        {
            return Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword));
        }
    }
}
