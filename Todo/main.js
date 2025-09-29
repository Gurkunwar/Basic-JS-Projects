let main = document.querySelector(".main");

let todosArr = JSON.parse(localStorage.getItem("Todos")) || [];

if (todosArr.length > 0) {
  render(todosArr);
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

function render(todosToRender) {
  let todosContainer = document.getElementById("todo-list");

  todosContainer.innerHTML = "";

  if (!todosToRender) return;

  todosToRender.forEach((todoItem) => {
    let todo = document.createElement("div");
    let checkbox = document.createElement("input");
    let text = document.createElement("p");

    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", todoItem.id);
    checkbox.classList.add("check");
    checkbox.checked = todoItem.completed;

    text.textContent = todoItem.text;
    text.classList.add("todoText");
    if (todoItem.completed === true) {
      text.classList.add("completed");
    }

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

    let todoParent = document.createElement("div");
    todoParent.classList.add("todos");

    todoParent.appendChild(todo);
    todoParent.appendChild(btns);

    todoParent.setAttribute("id", todoItem.id);

    todosContainer.appendChild(todoParent);
  });
}

function completeTodo(t) {
  let todoText = t.nextElementSibling;
  todoText.classList.toggle("completed");

  let todo = todosArr.find((todo) => todo.id == t.id);

  if (todo) {
    todo.completed = todo.completed === false ? true : false;
    localStorage.setItem("Todos", JSON.stringify(todosArr));
  }
}

function saveAndRender(){
    localStorage.setItem("Todos", JSON.stringify(todosArr));
    render(todosArr);
}

function deleteTodo(t) {
  const todoElement = t.closest(".todos");
  const todoIdToDelete = todoElement.id;

  todosArr = todosArr.filter(todo => todo.id != todoIdToDelete);
  saveAndRender();
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
    if (e.key === "Enter") {
      saveChanges();
    }
  });

  function saveChanges() {
    let newText = inp.value;
    let todo = todosArr.find((todo) => todo.id == todos.id);
    console.log(todo);

    if(todo){
        todo.text = newText;
        saveAndRender();
        console.log(todo);
    }
  }
}


// // Encapsulated in an IIFE
// (() => {
//   // --- STATE MANAGEMENT ---
//   let todosArr = JSON.parse(localStorage.getItem("Todos")) || [];

//   // --- DOM ELEMENTS ---
//   const main = document.querySelector(".main");
//   const todoListContainer = document.getElementById("todo-list");

//   // --- HELPER FUNCTIONS ---
//   function saveAndRender() {
//     localStorage.setItem("Todos", JSON.stringify(todosArr));
//     render(todosArr);
//   }

//   function createTodoHTML(todoItem) {
//     const isCompleted = todoItem.completed;
//     const completedClass = isCompleted ? 'completed' : '';
//     // Use the ID on the checkbox and buttons for easier event handling
//     return `
//       <div class="todos" id="${todoItem.id}">
//         <div class="todo">
//           <input type="checkbox" data-id="${todoItem.id}" class="check" ${isCompleted ? 'checked' : ''}>
//           <p class="todoText ${completedClass}">${todoItem.text}</p>
//         </div>
//         <div class="btns">
//           <button type="button" data-id="${todoItem.id}" class="edit-todo">Edit</button>
//           <button type="button" data-id="${todoItem.id}" class="delete-todo">Delete</button>
//         </div>
//       </div>
//     `;
//   }

//   // --- RENDER FUNCTION ---
//   function render(todosToRender) {
//     if (!todosToRender || todosToRender.length === 0) {
//       todoListContainer.innerHTML = '<p class="empty-message">No to-dos yet. Add one!</p>';
//       return;
//     }
//     const todosHTML = todosToRender.map(createTodoHTML).join('');
//     todoListContainer.innerHTML = todosHTML;
//   }

//   // --- EVENT HANDLERS / ACTIONS ---
//   function addTodo(t) {
//     const input = t.querySelector("input");
//     const text = input.value.trim();
//     if (text) {
//       const todoObj = { id: Date.now(), text: text, completed: false };
//       todosArr.push(todoObj);
//       input.value = "";
//       saveAndRender();
//     }
//   }

//   function completeTodo(checkbox) {
//     const todoId = checkbox.dataset.id;
//     const todo = todosArr.find((todo) => todo.id == todoId);
//     if (todo) {
//       todo.completed = !todo.completed;
//       saveAndRender();
//     }
//   }

//   function deleteTodo(button) {
//     const todoId = button.dataset.id;
//     todosArr = todosArr.filter(todo => todo.id != todoId);
//     saveAndRender();
//   }

//   function editTodo(button) {
//     // This part is more complex to do with a full re-render,
//     // but the principle is to add an "isEditing: true" state to the object
//     // and have the render function draw an input instead of a <p>
//     // For now, your existing editTodo function is a great achievement!
//   }

//   // --- INITIALIZATION ---
//   main.addEventListener("click", (e) => {
//     const t = e.target;
//     if (t.id === "add") addTodo(t.closest(".addTodo"));
//     else if (t.classList.contains("check")) completeTodo(t);
//     else if (t.classList.contains("delete-todo")) deleteTodo(t);
//     else if (t.classList.contains("edit-todo")) editTodo(t);
//   });

//   render(todosArr);

// })();