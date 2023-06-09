﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Library.Departments.Dto;
using Library.Entities;
using Library.Students.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Linq.Extensions;

namespace Library.Students
{
    public class StudentAppService : AsyncCrudAppService<Student, StudentDto, int, PagedStudentResultRequestDto, CreateStudentDto, StudentDto>, IStudentAppService
    {
        private readonly IRepository<Student, int> _repository;
        public StudentAppService(IRepository<Student, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override async Task<PagedResultDto<StudentDto>> GetAllAsync(PagedStudentResultRequestDto input)
        {
            var query = await _repository.GetAll()
                .Include(x=> x.Department)
                .OrderByDescending(x => x.Id)
                .Select( x => ObjectMapper.Map<StudentDto>(x))
                .ToListAsync();

            return new PagedResultDto<StudentDto>(query.Count(), query);
        }

        public async Task<List<StudentDto>> GetAllStudents()
        {
            var query = await _repository.GetAll()
                .Select(x => ObjectMapper.Map<StudentDto>(x))
                .ToListAsync();
            return query;
        }
    }
}
