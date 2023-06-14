﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Library.Books.Dto;
using Library.Borrowers.Dto;
using Library.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Collections.Extensions;
using Abp.Extensions;

namespace Library.Borrowers
{
    public class BorrowerAppService : AsyncCrudAppService<Borrower, BorrowerDto, int, PagedBorrowerResultRequestDto, CreateBorrowerDto, BorrowerDto>, IBorrowerAppService
    {
        private readonly IRepository<Borrower, int> _repository;
        private readonly IRepository<Book, int> _bookRepository;
        private readonly IRepository<Student, int> _studentRepository;
        public BorrowerAppService(IRepository<Borrower, int> repository, IRepository<Book, int> bookRepository, IRepository<Student, int> studentRepository) : base(repository)
        {
            _repository = repository;
            _bookRepository = bookRepository;
            _studentRepository = studentRepository;
        }

        public override async Task<BorrowerDto> CreateAsync(CreateBorrowerDto input)
        {
            try
            {
                var borrower = ObjectMapper.Map<Borrower>(input);
                //borrower.BorrowDate = input.BorrowDate.ToLocalTime();
                //borrower.ExpectedReturnDate = input.ExpectedReturnDate.ToLocalTime();
                await _repository.InsertAsync(borrower);

                var book = await _bookRepository.GetAsync(input.BookId);
                book.IsBorrowed = true;

                await _bookRepository.UpdateAsync(book);

                return base.MapToEntityDto(borrower);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public override async Task<PagedResultDto<BorrowerDto>> GetAllAsync(PagedBorrowerResultRequestDto input)
        {
            var query = await _repository.GetAll()
            .Include(x => x.Book)
                .ThenInclude(x => x.BookCategory)
                .ThenInclude(x => x.Department)
            .Include(x => x.Student)
                .ThenInclude(x => x.Department)
            .OrderByDescending(x => x.Id)
            .Select(x => ObjectMapper.Map<BorrowerDto>(x))
            .ToListAsync();

            return new PagedResultDto<BorrowerDto>(query.Count(), query);
        }

        public async Task<BorrowerDto> GetBorrowWithBookAndStudentUnderBookCategory(EntityDto<int> input)
        {
            var query = await _repository.GetAll()
                .Include(x => x.Student)
                    .ThenInclude(x => x.Department)
                .Include(x => x.Book)
                    .ThenInclude(x => x.BookCategory)
                    .ThenInclude(x => x.Department)                
                    .Where(x => x.Id == input.Id)
                .Select(x => ObjectMapper.Map<BorrowerDto>(x))
                .FirstOrDefaultAsync();

            return query;
        }

        public async Task<List<BookDto>> GetAllBooksByStudentId(int id)
        {
            var student = _studentRepository.GetAll()
                .Include(x => x.Department)
                .Where(x => x.Id == id)
                .FirstOrDefault();

            var books = await _bookRepository
                .GetAllIncluding(x => x.BookCategory, x => x.BookCategory.Department)
                .Where(x => x.BookCategory.DepartmentId == student.DepartmentId && !x.IsBorrowed)
                .ToListAsync();

            return ObjectMapper.Map<List<BookDto>>(books);
        }

        public override async Task<BorrowerDto> UpdateAsync(BorrowerDto input)
        {
            try
            {
                var borrower = ObjectMapper.Map<Borrower>(input);
                //borrower.BorrowDate = input.BorrowDate.ToLocalTime();
                //borrower.ExpectedReturnDate = input.ExpectedReturnDate.ToLocalTime();
                await _repository.UpdateAsync(borrower);

                var book = await _bookRepository.GetAsync(input.BookId);
                if (input.ReturnDate.HasValue)
                {
                    book.IsBorrowed = false;
                }

                await _bookRepository.UpdateAsync(book);

                return base.MapToEntityDto(borrower);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public override Task<BorrowerDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        protected override IQueryable<Borrower> CreateFilteredQuery(PagedBorrowerResultRequestDto input)
        {
            return Repository.GetAllIncluding(x => x.Book, x => x.Student)
               .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.BorrowDate.ToString().Contains(input.Keyword) || x.Book.BookTitle.ToString().Contains(input.Keyword) || x.Student.StudentName.Contains(input.Keyword));
        }

       
    }
}
