# Instruções para Publicação de Nova Versão - rock10-ui

Este documento descreve o passo a passo necessário para gerar e publicar uma nova versão do pacote de componentes `@rock10/ui`.

---

## Pré-requisitos

1. **Autenticação no NPM:**
   Certifique-se de que você está autenticado no registro do NPM correto com permissão para publicar no escopo `@rock10`.
   ```bash
   npm whoami
   ```
   Se não estiver autenticado, execute:
   ```bash
   npm login
   ```

2. **Branch Limpa:**
   Certifique-se de que todas as alterações estão commitadas e você está na branch principal (geralmente `main` ou `master`). O Git working directory precisa estar totalmente limpo para que o `npm version` funcione sem erros.
   ```bash
   git status
   ```

> [!TIP]
> Se você receber o erro `npm error Git working directory not clean`, significa que há arquivos modificados ou não rastreados (como este arquivo de documentação). Faça commit dessas alterações antes de executar o versionamento:
> ```bash
> git add .
> git commit -m "docs: adiciona instrucoes de publicacao"
> ```
> Alternativamente, se quiser apenas atualizar a versão no `package.json` sem criar um commit ou tag Git automáticos, você pode usar `--no-git-tag-version`:
> ```bash
> npm version patch --no-git-tag-version
> ```

---

## Passo a Passo para Publicação

### 1. Atualizar a Versão do Pacote

Você deve incrementar a versão no [package.json](file:///c:/AtualDev/Prototipo/Rock10Replay/rock10-ui/package.json). É altamente recomendável utilizar o comando do npm para atualizar a versão semanticamente:

* Para correções de bugs (Patch): `1.0.2` -> `1.0.3`
  ```bash
  npm version patch
  ```
* Para novas funcionalidades retrocompatíveis (Minor): `1.0.2` -> `1.1.0`
  ```bash
  npm version minor
  ```
* Para alterações incompatíveis/quebras (Major): `1.0.2` -> `2.0.0`
  ```bash
  npm version major
  ```

> O comando `npm version` altera automaticamente o `package.json`, cria um commit de versão e uma tag git local correspondente.

### 2. Executar o Build de Produção

Gere a build final da biblioteca para garantir que a pasta `dist` esteja atualizada e sem erros de tipagem TypeScript:
```bash
npm run build
```

### 3. Publicar no NPM

Como o pacote usa um escopo `@rock10/ui`, por padrão o NPM tenta publicar de forma privada. Para publicar publicamente no registro do NPM, utilize:
```bash
npm publish --access public
```

### 4. Sincronizar com o Repositório Remoto (Git)

Envie os commits e as tags criadas para o repositório remoto para manter o histórico atualizado:
```bash
git push origin main --follow-tags
```

---

## Resumo dos Comandos

Para uma publicação rápida (ex: incremento de patch):

```bash
# 1. Incrementa versão e cria tag git
npm version patch

# 2. Builda os arquivos
npm run build

# 3. Publica no NPM
npm publish --access public

# 4. Envia para o Git remoto
git push origin main --follow-tags
```

---

## Recursos Adicionais Adicionados ao Projeto

### 🧪 Testes Unitários e de Integração
Antes de publicar uma nova versão, garanta que todos os testes estejam passando com sucesso:
```bash
npm run test
```
* **Vitest** é usado tanto para os testes unitários baseados no DOM (`jsdom`) quanto para testes de visualização em navegador real headless (`Playwright` + `Storybook`).

### 📓 Storybook (Documentação Viva)
Para rodar localmente o ambiente isolado de desenvolvimento dos componentes e documentação:
```bash
npm run storybook
```
Para exportar a versão estática do Storybook (ex: para deploy na web):
```bash
npm run build-storybook
```

### 🦋 Releases Controlados com Changesets
Configuramos o **Changesets** para gerenciar bumps de versão e geração de Changelogs automática.

1. **Ao criar uma alteração ou nova funcionalidade, adicione um changeset:**
   ```bash
   npx changeset
   ```
   * Siga as instruções no prompt para selecionar o tipo de alteração (major/minor/patch) e escrever a nota do changelog.
   * Faça o commit do arquivo `.changeset/xxxx.md` gerado junto com seu código.

2. **Ao preparar a release/publicação:**
   ```bash
   npx changeset version
   ```
   * Isso consumirá os arquivos do changeset, fará o bump das versões corretas no `package.json` e gerará/atualizará o arquivo `CHANGELOG.md` automaticamente.
   * Depois disso, basta rodar `npm run build` e publicar!

