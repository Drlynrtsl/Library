using Abp.AutoMapper;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Authors.Dto
{
    [AutoMapTo(typeof(Author))]
    public class CreateAuthorDto
    {
        [Required]
        public string Name { get; set; }
    }
}
