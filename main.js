let input = document.querySelector("input");
let add = document.querySelector("#add");
let main = document.querySelector(".main");
console.dir(add);

add.addEventListener("click", () => {
    let todo = document.createElement("div");
    let checkbox = document.createElement("input");
    let text = document.createElement("p");
    
    checkbox.setAttribute("type", "checkbox");
    text.textContent = input.value;
    todo.classList.add("todo");
    todo.appendChild(checkbox);
    todo.appendChild(text);
    
    let btns = document.createElement("div");
    let edit = document.createElement("button");
    let del = document.createElement("button");

    btns.classList.add("btns");
    edit.setAttribute("type", "button");
    del.setAttribute("type", "button");
    edit.textContent = "Edit";
    del.textContent = "Delete";
    btns.appendChild(edit);
    btns.appendChild(del);

    let todos = document.createElement("div");
    todos.classList.add("todos");

    todos.appendChild(todo);
    todos.appendChild(btns);

    main.appendChild(todos);

})