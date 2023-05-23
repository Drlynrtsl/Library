using Abp.Application.Services;
using Library.Borrowers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Borrowers
{
    public interface IBorrowerAppService : IAsyncCrudAppService<BorrowerDto, int, PagedBorrowerResultRequestDto, CreateBorrowerDto, BorrowerDto>
    {

    }
}
