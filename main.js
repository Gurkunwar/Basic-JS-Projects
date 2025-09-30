let main = document.querySelector(".main");

let todosArr = JSON.parse(localStorage.getItem("Todos")) || [];

if (todosArr.length > 0) {
  render(todosArr);
} else {
  emptyTodoList();
}

main.addEventListener("click", (e) => {
  let t = e.target;
  if (t.id === "add") {
    addTodo(t.closest(".addTodo"));
  } else if (t.classList.contains("check")) {
    completeTodo(t);
  } else if (t.classList.contains("delete-todo")) {
    deleteTodo(t);
  } else if (t.classList.contains("edit-todo")) {
    editTodo(t);
  }
});

function addTodo(t) {
  let input = t.querySelector("input");
  let text = input.value;

  if (text !== "") {
    let todoObj = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    todosArr.push(todoObj);
    localStorage.setItem("Todos", JSON.stringify(todosArr));
    render(todosArr);

    input.value = "";
  }
}

function emptyTodoList() {
  let todosContainer = document.getElementById("todo-list");
  todosContainer.innerHTML = "";

  let h1 = document.createElement("h1");
  h1.textContent = "Empty List, Add Some Tasks To Do!!";
  todosContainer.appendChild(h1);
}

function render(todosToRender) {
  const todosContainer = document.getElementById("todo-list");
  todosContainer.innerHTML = "";

  if (!todosToRender || todosToRender.length === 0) {
    emptyTodoList();
    return;
  }

  todosToRender.forEach((todoItem) => {
    const todoParent = document.createElement("div");
    todoParent.classList.add("todos");
    todoParent.setAttribute("id", todoItem.id);
    // todoParent.classList.add("new-item");
    // setTimeout(() => {
    //   todoParent.classList.remove("new-item");
    // }, 400);

    if (todoItem.isEditing) {
      const inp = document.createElement("input");
      inp.type = "text";
      inp.value = todoItem.text;
      inp.classList.add("edit-input");

      inp.addEventListener("blur", () => saveChanges(todoItem.id, inp));
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          saveChanges(todoItem.id, inp);
        }
      });

      todoParent.appendChild(inp);

      setTimeout(() => inp.focus(), 0);
    } else {
      const todo = document.createElement("div");
      todo.classList.add("todo");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `check-${todoItem.id}`;
      checkbox.classList.add("check");
      checkbox.checked = todoItem.completed;

      const text = document.createElement("label");
      text.setAttribute("for", `check-${todoItem.id}`);
      text.textContent = todoItem.text;
      text.classList.add("todoText");
      if (todoItem.completed) {
        text.classList.add("completed");
      }

      todo.appendChild(checkbox);
      todo.appendChild(text);

      const btns = document.createElement("div");
      btns.classList.add("btns");

      const edit = document.createElement("button");
      edit.type = "button";
      edit.textContent = "Edit";
      edit.classList.add("edit-todo");

      const del = document.createElement("button");
      del.type = "button";
      del.textContent = "Delete";
      del.classList.add("delete-todo");

      btns.appendChild(edit);
      btns.appendChild(del);

      todoParent.appendChild(todo);
      todoParent.appendChild(btns);
    }

    todosContainer.appendChild(todoParent);
  });
}

function completeTodo(t) {
  let todoText = t.nextElementSibling;
  todoText.classList.toggle("completed");

  let todo = todosArr.find((todo) => todo.id == t.id);

  if (todo) {
    todo.completed = !todo.completed;
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem("Todos", JSON.stringify(todosArr));
  if (todosArr.length > 0) {
    render(todosArr);
  } else {
    emptyTodoList();
  }
}

function deleteTodo(t) {
  const todoElement = t.closest(".todos");
  const todoIdToDelete = todoElement.id;

  todosArr = todosArr.filter((todo) => todo.id != todoIdToDelete);
  saveAndRender();
}

function editTodo(t) {
  const todoElement = t.closest(".todos");
  const todoIdToEdit = todoElement.id;

  const todoToEdit = todosArr.find((todo) => todo.id == todoIdToEdit);

  if (todoToEdit) {
    todoToEdit.isEditing = true;
  }

  render(todosArr);
}

function saveChanges(todoId, inputElement) {
  const todoToUpdate = todosArr.find((todo) => todo.id == todoId);

  if (todoToUpdate) {
    todoToUpdate.text = inputElement.value;
    delete todoToUpdate.isEditing;
  }

  saveAndRender();
}
 