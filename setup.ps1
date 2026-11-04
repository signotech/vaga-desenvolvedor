$ErrorActionPreference = "Stop"

Write-Host "== Enzzo Pedidos: preparando Laravel 13 ==" -ForegroundColor Cyan

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw "Docker CLI não encontrado. Instale/inicie o Docker Desktop."
}
docker info *> $null
if ($LASTEXITCODE -ne 0) {
    throw "Docker Engine não está ativo. Abra o Docker Desktop e tente novamente."
}

New-Item -ItemType Directory -Force -Path ".\app" | Out-Null

if (-not (Test-Path ".\app\artisan")) {
    Write-Host "Criando Laravel 13 com Composer dentro de container..."
    docker run --rm -v "${PWD}\app:/app" -w /app composer:2 create-project laravel/laravel:^13.0 .
    if ($LASTEXITCODE -ne 0) { throw "Falha ao criar o projeto Laravel." }
} else {
    Write-Host "Laravel já existe em app/. Pulando create-project."
}

Write-Host "Aplicando arquivos do desafio..."
Copy-Item ".\scaffold\*" ".\app\" -Recurse -Force

if (-not (Test-Path ".\app\.env")) {
    Copy-Item ".\app\.env.example" ".\app\.env"
}

Write-Host ""
Write-Host "Base preparada. Agora execute:" -ForegroundColor Green
Write-Host "docker compose up -d --build"
Write-Host "docker compose exec app php artisan key:generate"
Write-Host "docker compose exec app php artisan migrate --seed"
