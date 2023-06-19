﻿using Abp.Application.Services;
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

namespace Library.Books
{
    public class BookAppService : AsyncCrudAppService<Book, BookDto, int, PagedBookResultRequestDto, CreateBookDto, BookDto>, IBookAppService
    {
        private readonly IRepository<Book, int> _repository;
        public BookAppService(IRepository<Book, int> repository) : base(repository)
        {
            _repository = repository;
        }


        public override async Task<PagedResultDto<BookDto>> GetAllAsync(PagedBookResultRequestDto input)
        {
            var query = await _repository.GetAll()
                .Include(x => x.BookCategory)
                .Include(x => x.Author)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<BookDto>(x))
                .ToListAsync();

            return new PagedResultDto<BookDto>(query.Count(), query);
        }

        public async Task<List<BookDto>> GetAllAvailableBooks()
        {
           var query = await _repository.GetAll()
                .Where(x => !x.IsBorrowed)
                .Select(x => ObjectMapper.Map<BookDto>(x))
                .ToListAsync();
                return query;            
        }

        public async Task<BookDto> GetUpdateIsBorrowed(BookDto input)
        {
            try
            {
                var book = await _repository.GetAsync(input.Id);
                if (book.IsBorrowed)
                {
                    book.IsBorrowed = false;
                }
                else
                {
                    book.IsBorrowed = true;
                }

                await _repository.UpdateAsync(book);

                return base.MapToEntityDto(book);
            }catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
