let input = document.querySelector("input");
let add = document.querySelector("#add");
let main = document.querySelector(".main");

add.addEventListener("click", addTodo);

function addTodo() {
  if (input.value !== "") {
    let todo = document.createElement("div");
    let checkbox = document.createElement("input");
    let text = document.createElement("p");

    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("check");
    text.textContent = input.value;
    text.classList.add("todoText");
    todo.classList.add("todo");
    todo.appendChild(checkbox);
    todo.appendChild(text);

    let btns = document.createElement("div");
    let edit = document.createElement("button");
    let del = document.createElement("button");

    btns.classList.add("btns");
    edit.setAttribute("type", "button");
    edit.textContent = "Edit";
    edit.classList.add("edit-todo");
    del.setAttribute("type", "button");
    del.textContent = "Delete";
    del.classList.add("delete-todo");
    btns.appendChild(edit);
    btns.appendChild(del);

    let todos = document.createElement("div");
    todos.classList.add("todos");

    todos.appendChild(todo);
    todos.appendChild(btns);
    todos.setAttribute("id", Date.now());

    main.appendChild(todos);

    input.value = "";
  }
}

main.addEventListener("click", (e) => {
  let t = e.target;
  if (t.classList.contains("check")) {
    completeTodo(t);
  } else if (t.classList.contains("delete-todo")) {
    deleteTodo(t);
  } else if (t.classList.contains("edit-todo")) {
    editTodo(t);
  }
});

function completeTodo(t) {
  let todoText = t.nextElementSibling;
  todoText.classList.toggle("completed");
}

function deleteTodo(t) {
  let todos = t.closest(".todos");
  todos.remove();
}

function editTodo(t) {
  let todos = t.closest(".todos");
  let todo = todos.querySelector(".todo");
  let p = todos.querySelector(".todoText");
  let text = p.textContent;

  let inp = document.createElement("input");
  inp.setAttribute("type", "text");
  inp.setAttribute("value", text);
  inp.classList.add("todoText");
  inp.classList.add("edit-input");

  todo.replaceChild(inp, p);
  inp.focus();

  inp.addEventListener("blur", saveChanges);
  inp.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        saveChanges();
    }
  });

  function saveChanges() {
    let newText = document.createElement("p");
    newText.classList.add("todoText");
    newText.textContent = inp.value;
    todo.replaceChild(newText, inp);
  }
}
