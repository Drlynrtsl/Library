using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Library.Books.Dto;
using Library.Borrowers.Dto;
using Library.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Borrowers
{
    public class BorrowerAppService : AsyncCrudAppService<Borrower, BorrowerDto, int, PagedBorrowerResultRequestDto, CreateBorrowerDto, BorrowerDto>
    {
        private readonly IRepository<Borrower, int> _repository;
        private readonly IRepository<Book, int> _bookRepository;
        public BorrowerAppService(IRepository<Borrower, int> repository) : base(repository)
        {
            _repository = repository;   
        }

        //public override async Task<BorrowerDto> CreateAsync(CreateBorrowerDto input)
        //{
        //    try
        //    {
        //        var borrow = ObjectMapper.Map<Borrower>(input);
        //        await _repository.InsertAsync(borrow);

        //        var book = await _bookRepository.GetAsync(input.BookId);
        //        book.IsBorrowed = true;

        //        await _bookRepository.UpdateAsync(book);

        //        return base.MapToEntityDto(borrow);
        //    }
        //    catch (Exception e)
        //    {

        //        throw e;
        //    }
        //}

        public override async Task<PagedResultDto<BorrowerDto>> GetAllAsync(PagedBorrowerResultRequestDto input)
        {
            var query = await _repository.GetAll()
            .Include(x => x.Book)
            .Include(x => x.Student)
            .Select( x => ObjectMapper.Map<BorrowerDto>(x))
            .ToListAsync();

            return new PagedResultDto<BorrowerDto>(query.Count(), query);
        }

        public async Task<BorrowerDto> GetBorrowWithBookAndStudentUnderBookCategory(EntityDto<int> input)
        {
            var query = await _repository.GetAll()
                .Include(x => x.Book)
                    .ThenInclude(x => x.BookCategory)
                    .ThenInclude(x => x.Department)
                .Include(x => x.Student)
                    .ThenInclude(x => x.Department)
                .Where(x => x.Id == input.Id)
                .Select(x => ObjectMapper.Map<BorrowerDto>(x))
                .FirstOrDefaultAsync();

            return query;
        }

        //public override async Task<BorrowerDto> UpdateAsync(BorrowerDto input)
        //{
        //    try
        //    {
        //        var borrow = ObjectMapper.Map<Borrower>(input);
        //        await _repository.UpdateAsync(borrow);

        //        var book = await _bookRepository.GetAsync(input.BookId);
        //        if (input.ReturnDate.HasValue)
        //        {
        //            book.IsBorrowed = false;
        //        }

        //        await _bookRepository.UpdateAsync(book);

        //        return base.MapToEntityDto(borrow);
        //    }
        //    catch (Exception e)
        //    {

        //        throw e;
        //    }
        //}
    }
}
