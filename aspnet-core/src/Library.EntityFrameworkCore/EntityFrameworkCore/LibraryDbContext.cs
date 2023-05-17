using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Library.Authorization.Roles;
using Library.Authorization.Users;
using Library.MultiTenancy;
using Library.Entities;

namespace Library.EntityFrameworkCore
{
    public class LibraryDbContext : AbpZeroDbContext<Tenant, Role, User, LibraryDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public LibraryDbContext(DbContextOptions<LibraryDbContext> options)
            : base(options)
        {
        }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Student> Students { get; set; }
    }
}
