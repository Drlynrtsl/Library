﻿using Abp.Application.Services.Dto;
using Library.Books.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Borrowers.Dto
{
    public class PagedBorrowerResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
