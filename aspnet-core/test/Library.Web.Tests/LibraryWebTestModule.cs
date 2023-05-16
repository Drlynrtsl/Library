using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Library.EntityFrameworkCore;
using Library.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace Library.Web.Tests
{
    [DependsOn(
        typeof(LibraryWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class LibraryWebTestModule : AbpModule
    {
        public LibraryWebTestModule(LibraryEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(LibraryWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(LibraryWebMvcModule).Assembly);
        }
    }
}