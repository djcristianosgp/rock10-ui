# @rock10/ui

Biblioteca de componentes de interface (UI) reutilizáveis para os portais e sistemas do ecossistema **Rock10 Replay**. 

Construída utilizando **React**, **TypeScript**, **Tailwind CSS** e empacotada com **Vite**.

---

## 🚀 Instalação

Como o pacote faz parte do escopo privado/público `@rock10`, instale-o diretamente através do NPM:

```bash
npm install @rock10/ui
```

### Importação de Estilos (Obrigatório)

Para que as classes do Tailwind CSS e estilos internos dos componentes funcionem corretamente, importe o arquivo CSS global da biblioteca no ponto de entrada da sua aplicação (ex: `main.tsx` ou `App.tsx`):

```tsx
import '@rock10/ui/dist/style.css';
```

---

## 📦 Componentes Disponíveis

A biblioteca fornece os seguintes componentes customizáveis e preparados para acessibilidade:

* **`IconButton`**: Botão otimizado para ícones com suporte a diferentes tamanhos, variantes de gradiente, estados de carregamento e foco acessível.
* **`ConfirmDialog`**: Caixa de diálogo modal de confirmação para ações destrutivas ou importantes.
* **`Modal`**: Base de modal com suporte a controle de scroll e fechamento via clique externo.
* **`DatePicker` & `DateSelector`**: Seletores e painéis inteligentes para filtragem de datas.
* **`DownloadButton`**: Botão com animações e microinterações específicas para exportação de dados.
* **`EmptyState`**: Layout padrão para exibir estados vazios ou sem dados nos portais.
* **`SearchBar`**: Barra de pesquisa de alta performance com debounce/limpeza integrada.
* **`LikeButton`**: Botão interativo para ações rápidas de engajamento.
* **`Loading`**: Feedbacks visuais e loaders para carregamentos assíncronos.

---

## 💻 Desenvolvimento Local

Para clonar e fazer melhorias na biblioteca:

### Instalar dependências
```bash
npm install
```

### Ambiente de Desenvolvimento & Documentação (Storybook)
Inicie o Storybook local para inspecionar, testar e documentar os componentes isoladamente:
```bash
npm run storybook
```

### Rodar a suíte de testes (Vitest + JSDom + Playwright)
Tanto testes unitários locais quanto testes de renderização do Storybook em navegador headless:
```bash
npm run test
```

### Gerar build de produção
Compila os componentes para a pasta `dist/` gerando os bundles UMD/ES e os arquivos de declaração de tipos (`.d.ts`):
```bash
npm run build
```

---

## 🦋 Publicando Novas Versões

Esta biblioteca utiliza **Changesets** para gerenciar versionamento e changelogs automáticos.

1. Ao criar uma modificação que impacte a versão, rode:
   ```bash
   npx changeset
   ```
2. Siga as perguntas no console para definir se é patch/minor/major e descrever as alterações.
3. Para mais detalhes sobre publicação manual ou via CI, veja o guia completo em [como-publicar.md](file:///c:/AtualDev/Prototipo/Rock10Replay/rock10-ui/Docs/como-publicar.md).
