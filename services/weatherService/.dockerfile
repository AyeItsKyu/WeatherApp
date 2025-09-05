FROM mcr.microsoft.com/dotnet/sdk:9.0@sha256:3fcf6f1e809c0553f9feb222369f58749af314af6f063f389cbd2f913b4ad556
WORKDIR /app

COPY *.csproj ./

RUN dotnet restore

COPY . ./

RUN dotnet build -c Debug -o /Build && \
    dotnet tool install --global dotnet-ef --version 9.0.8

ENV PATH="$PATH:/root/.dotnet/tools"
