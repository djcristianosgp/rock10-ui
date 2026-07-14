param (
    [Parameter(Mandatory=$false)]
    [ValidateSet("patch", "minor", "major")]
    [string]$BumpType = "patch"
)

$ErrorActionPreference = "Stop"

# Define paths
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Resolve-Path (Join-Path $ScriptDir "..\..\..\rock10-ui")

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Iniciando Deploy de @rock10/ui" -ForegroundColor Cyan
Write-Host "Diretório do projeto: $ProjectDir" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Navega até o diretório do projeto
Push-Location $ProjectDir

try {
    # 1. Limpar / instalar dependências se necessário
    Write-Host "1. Verificando dependências..." -ForegroundColor Yellow
    npm install

    # 2. Executar compilação
    Write-Host "2. Compilando o projeto..." -ForegroundColor Yellow
    npm run build
    Write-Host "✓ Compilação concluída com sucesso!" -ForegroundColor Green

    # 3. Incrementar a versão no package.json
    Write-Host "3. Incrementando versão ($BumpType)..." -ForegroundColor Yellow
    $NewVersion = npm version $BumpType --no-git-tag-version
    Write-Host "✓ Versão atualizada para: $NewVersion" -ForegroundColor Green

    # 4. Publicar no NPM
    Write-Host "4. Publicando versão no NPM..." -ForegroundColor Yellow
    # Nota: Caso precise de autenticação OTP, o npm solicitará interativamente ou falhará se não configurado
    npm publish --access public
    Write-Host "✓ Publicação no NPM concluída com sucesso!" -ForegroundColor Green

    Write-Host "=============================================" -ForegroundColor Green
    Write-Host "Deploy finalizado com sucesso! Nova versão: $NewVersion" -ForegroundColor Green
    Write-Host "=============================================" -ForegroundColor Green
}
catch {
    Write-Host "❌ Erro durante o processo de deploy: $_" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location
