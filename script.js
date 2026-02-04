const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const filterButtons = document.querySelectorAll(".filters button");
const themeToggle = document.querySelector("#theme-toggle");
const counter = document.querySelector("#counter");

let todos = loadTodos();
let filter = "all";
let draggedId = null;

// STORAGE
function loadTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// CRUD
function addTodo(text) {
    todos.push({ id: Date.now(), text, done: false });
    saveTodos();
    render();
}

function toggleTodo(id) {
    todos = todos.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
    );
    saveTodos();
    render();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    render();
}

function editTodo(id, text) {
    todos = todos.map(t =>
        t.id === id ? { ...t, text } : t
    );
    saveTodos();
    render();
}

// FILTER
function getFilteredTodos() {
    if (filter === "pending") return todos.filter(t => !t.done);
    if (filter === "done") return todos.filter(t => t.done);
    return todos;
}

// COUNTER
function updateCounter() {
    const pending = todos.filter(t => !t.done).length;
    counter.textContent = `${pending} tarefa${pending !== 1 ? "s" : ""} pendente${pending !== 1 ? "s" : ""}`;
}

// RENDER
function render() {
    list.innerHTML = "";
    updateCounter();

    getFilteredTodos().forEach(todo => {
        const li = document.createElement("li");
        li.draggable = true;
        li.dataset.id = todo.id;
        if (todo.done) li.classList.add("completed");

        li.innerHTML = `
      <span>${todo.text}</span>
      <div class="actions">
        <button class="complete">Concluir</button>
        <button class="edit">Editar</button>
        <button class="delete">Excluir</button>
      </div>
    `;

        // Drag events
        li.addEventListener("dragstart", () => {
            draggedId = todo.id;
            li.classList.add("dragging");
        });

        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
        });

        li.addEventListener("dragover", e => {
            e.preventDefault();
        });

        li.addEventListener("drop", () => {
            const draggedIndex = todos.findIndex(t => t.id === draggedId);
            const targetIndex = todos.findIndex(t => t.id === todo.id);

            const draggedItem = todos[draggedIndex];
            todos.splice(draggedIndex, 1);
            todos.splice(targetIndex, 0, draggedItem);

            saveTodos();
            render();
        });

        const span = li.querySelector("span");
        const completeBtn = li.querySelector(".complete");
        const editBtn = li.querySelector(".edit");
        const deleteBtn = li.querySelector(".delete");

        span.onclick = () => toggleTodo(todo.id);
        completeBtn.onclick = () => toggleTodo(todo.id);
        deleteBtn.onclick = () => deleteTodo(todo.id);

        editBtn.onclick = () => {
            const editInput = document.createElement("input");
            editInput.value = todo.text;
            editInput.className = "edit-input";

            editInput.onblur = () => {
                if (editInput.value.trim()) editTodo(todo.id, editInput.value.trim());
                else render();
            };

            editInput.onkeypress = e => {
                if (e.key === "Enter") editInput.blur();
            };

            li.replaceChild(editInput, span);
            editInput.focus();
        };

        list.appendChild(li);
    });
}

// EVENTS
form.addEventListener("submit", e => {
    e.preventDefault();
    if (!input.value.trim()) return;
    addTodo(input.value.trim());
    input.value = "";
});

filterButtons.forEach(btn => {
    btn.onclick = () => {
        document.querySelector(".filters .active").classList.remove("active");
        btn.classList.add("active");
        filter = btn.dataset.filter;
        render();
    };
});

themeToggle.onclick = () => {
    document.body.classList.toggle("light");
    themeToggle.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
};

render();