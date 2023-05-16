using System.Threading.Tasks;
using Library.Models.TokenAuth;
using Library.Web.Controllers;
using Shouldly;
using Xunit;

namespace Library.Web.Tests.Controllers
{
    public class HomeController_Tests: LibraryWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}