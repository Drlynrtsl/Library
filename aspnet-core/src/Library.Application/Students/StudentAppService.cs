using Abp.Application.Services;
using Abp.Domain.Repositories;
using Library.Departments.Dto;
using Library.Entities;
using Library.Students.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Students
{
    public class StudentAppService : AsyncCrudAppService<Student, StudentDto, int, PagedStudentResultRequestDto, CreateStudentDto, StudentDto>, IStudentAppService
    {
        private readonly IRepository<Student, int> _repository;
        private readonly IRepository<Department, int> _departmentRepository;
        public StudentAppService(IRepository<Student, int> repository, IRepository<Department, int> departmentRepository) : base(repository)
        {
            _repository = repository;
            _departmentRepository = departmentRepository;
        }

        public async Task<List<DepartmentDto>> GetAllDepartments()
        {
            var query = await _departmentRepository.GetAll()
                .Select(x => ObjectMapper.Map<DepartmentDto>(x))
                .ToListAsync();
            return query;
        }
    }
}
