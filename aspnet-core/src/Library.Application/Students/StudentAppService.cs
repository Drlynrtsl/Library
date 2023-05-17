using Abp.Application.Services;
using Abp.Domain.Repositories;
using Library.Entities;
using Library.Students.Dto;
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

        public StudentAppService(IRepository<Student, int> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
