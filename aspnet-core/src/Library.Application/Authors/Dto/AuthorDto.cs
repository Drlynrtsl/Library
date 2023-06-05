using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Authors.Dto
{
    [AutoMapTo(typeof(Author))]
    [AutoMapFrom(typeof(Author))]
    public class AuthorDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
