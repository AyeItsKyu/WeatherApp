FROM mcr.microsoft.com/dotnet/sdk:9.0@sha256:3fcf6f1e809c0553f9feb222369f58749af314af6f063f389cbd2f913b4ad556 AS build
WORKDIR /App

COPY *.csproj ./

RUN dotnet restore

COPY . ./
RUN dotnet build -c Debug -o /App/Build

FROM mcr.microsoft.com/dotnet/sdk:9.0@sha256:3fcf6f1e809c0553f9feb222369f58749af314af6f063f389cbd2f913b4ad556 AS runtime
WORKDIR /app
COPY --from=build /App/Build ./
ENTRYPOINT ["dotnet", "ApiGateway.dll"]