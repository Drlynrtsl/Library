using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Library.Authorization;

namespace Library
{
    [DependsOn(
        typeof(LibraryCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class LibraryApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<LibraryAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(LibraryApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
