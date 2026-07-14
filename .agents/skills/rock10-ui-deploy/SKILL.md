---
name: rock10-ui-deploy
description: Auto-incrementa a versão, compila e publica a biblioteca de componentes @rock10/ui no NPM.
---

# Deploy Automation - `@rock10/ui`

Esta skill automatiza e garante a consistência do fluxo de deploy e publicação da biblioteca `@rock10/ui` no NPM Registry.

## Como Utilizar

Você pode invocar o script de deploy fornecendo o tipo de incremento de versão desejado (`patch`, `minor` ou `major`). O padrão é `patch`.

### Exemplo de Comando

Para realizar um deploy de correção de bugs (patch):
```powershell
powershell -File .agents/skills/rock10-ui-deploy/scripts/deploy.ps1 -BumpType patch
```

Para realizar um deploy de novas funcionalidades compatíveis (minor):
```powershell
powershell -File .agents/skills/rock10-ui-deploy/scripts/deploy.ps1 -BumpType minor
```

Para realizar um deploy de mudanças incompatíveis (major):
```powershell
powershell -File .agents/skills/rock10-ui-deploy/scripts/deploy.ps1 -BumpType major
```

## O que esta Automação Faz

1. **Instalação**: Garante que o diretório `node_modules` de `rock10-ui` está atualizado.
2. **Validação e Compilação**: Executa a compilação de produção (`npm run build`). Se houver algum erro de compilação ou de tipos TypeScript, o processo é interrompido.
3. **Versão (Bumping)**: Executa `npm version <tipo>` para atualizar a versão no `package.json` e `package-lock.json`.
4. **Publicação**: Executa o comando `npm publish --access public` para disponibilizar a nova versão no NPM registry.

## Pré-requisitos

Para que o deploy funcione corretamente, o desenvolvedor deve estar autenticado no NPM. Se necessário, execute:
```bash
npm login
```
antes de iniciar o deploy.
