﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Library.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Students
{
    public interface IStudentAppService : IAsyncCrudAppService<StudentDto, int, PagedStudentResultRequestDto, CreateStudentDto, StudentDto>
    {
        Task<PagedResultDto<StudentDto>> GetAllAsync(PagedStudentResultRequestDto input);
        Task<List<StudentDto>> GetAllStudents();
    }
}
