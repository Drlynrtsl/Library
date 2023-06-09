using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Library.Departments.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Departments
{
    public interface IDepartmentAppService : IAsyncCrudAppService<DepartmentDto, int, PagedDepartmentResultRequestDto, CreateDepartmentDto, DepartmentDto>
    {
        Task<PagedResultDto<DepartmentDto>> GetAllAsync(PagedDepartmentResultRequestDto input);
        Task<List<DepartmentDto>> GetAllDepartments();
    }
}
