using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Library.Departments.Dto;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        
    }
}
