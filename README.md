# 📝 To-Do List App

Aplicação de lista de tarefas desenvolvida com **HTML, CSS e JavaScript puro**, simulando um **teste técnico real**, com foco em organização de código, experiência do usuário e decisões técnicas bem definidas.

---

## 🚀 Funcionalidades

- Adicionar, editar e excluir tarefas
- Concluir tarefas
- Filtro por status (todas, pendentes, concluídas)
- 🌙☀️ Dark / Light Mode
- 🔢 Contador de tarefas pendentes
- 🔀 Reordenação de tarefas com Drag and Drop
- Persistência com LocalStorage
- Interface moderna com animações suaves

---

## 🧠 Decisões Técnicas

### 📌 Organização
O JavaScript foi estruturado separando:
- Estado
- Persistência
- Lógica de negócio
- Renderização

Facilitando manutenção e futura migração para React.

---

### 🌙 Dark / Light Mode
Implementado com **variáveis CSS**, alteradas por uma classe no `body`.
Isso evita duplicação de estilos e mantém o código limpo e escalável.

---

### 🔀 Drag and Drop
O reordenamento foi feito utilizando a **Drag and Drop API nativa**, sem bibliotecas externas.
A nova ordem é salva no LocalStorage, garantindo persistência mesmo após recarregar a página.

---

### 🔢 Contador de Pendentes
O contador é derivado do estado principal, garantindo consistência e evitando estados duplicados.

---

Offline First
A aplicação funciona completamente offline após o primeiro carregamento, utilizando o localStorage do navegador para persistência dos dados, garantindo uma experiência rápida, confiável e independente de conexão com a internet.

## 📈 Possíveis Evoluções
- Backend e autenticação
- Drag and drop entre colunas
- Versão em React
- Testes automatizados

---

## 👨‍💻 Autor

Antonio — Desenvolvedor Front-End  
Projeto desenvolvido com foco em portfólio e entrevistas técnicas.

## 📱💻 Preview do Projeto
<br>
<img src="https://github.com/AntonioLuiz-dev/TO-DO-LIST-APP/blob/main/assets/mockup.png?raw=true" width="500px"/>
