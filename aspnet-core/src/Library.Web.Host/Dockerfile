FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/Library.Web.Host/Library.Web.Host.csproj", "src/Library.Web.Host/"]
COPY ["src/Library.Web.Core/Library.Web.Core.csproj", "src/Library.Web.Core/"]
COPY ["src/Library.Application/Library.Application.csproj", "src/Library.Application/"]
COPY ["src/Library.Core/Library.Core.csproj", "src/Library.Core/"]
COPY ["src/Library.EntityFrameworkCore/Library.EntityFrameworkCore.csproj", "src/Library.EntityFrameworkCore/"]
WORKDIR "/src/src/Library.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/Library.Web.Host", "src/Library.Web.Host"]
COPY ["src/Library.Web.Core", "src/Library.Web.Core"]
COPY ["src/Library.Application", "src/Library.Application"]
COPY ["src/Library.Core", "src/Library.Core"]
COPY ["src/Library.EntityFrameworkCore", "src/Library.EntityFrameworkCore"]
WORKDIR "/src/src/Library.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "Library.Web.Host.dll"]
