(() => {
  let todosArr = JSON.parse(localStorage.getItem("Todos")) || [];

  const main = document.querySelector(".main");
  const todoListContainer = document.querySelector("#todo-list");
  const addTodoContainer = document.querySelector(".addTodo");

  function saveAndRender() {
    localStorage.setItem("Todos", JSON.stringify(todosArr));
    render();
  }

  function createTodoHTML(todoItem) {
    const isCompleted = todoItem.completed;
    const completedClass = isCompleted ? 'completed' : '';
    const animationClass = todoItem.isNew ? "new-item" : "";

    if (todoItem.isEditing) {
      return `
        <div class="todos" id="${todoItem.id}">
          <input type="text" class="edit-input" value="${todoItem.text}" data-id="${todoItem.id}" />
        </div>
      `;
    }

    return `
      <div class="todos ${animationClass}" id="${todoItem.id}">
        <div class="todo">
          <input type="checkbox" id="check-${todoItem.id}" class="check" data-id="${todoItem.id}" ${isCompleted ? 'checked' : ''}>
          <label for="check-${todoItem.id}" class="todoText ${completedClass}">${todoItem.text}</label>
        </div>
        <div class="btns">
          <button type="button" class="edit-todo" data-id="${todoItem.id}">Edit</button>
          <button type="button" class="delete-todo" data-id="${todoItem.id}">Delete</button>
        </div>
      </div>
    `;
  }

  function render() {
    if (todosArr.length === 0) {
      todoListContainer.innerHTML = '<p class="empty-message">Empty List, Add Some Tasks To Do!!</p>';
      return;
    }
    const todosHTML = todosArr.map(createTodoHTML).join('');
    todoListContainer.innerHTML = todosHTML;

    const newItems = todoListContainer.querySelectorAll('.new-item');
    if (newItems.length > 0) {
      setTimeout(() => {
        newItems.forEach(item => {
          const todo = todosArr.find(t => t.id == item.id);
          if (todo) delete todo.isNew;
          item.classList.remove('new-item');
        });
      }, 10);
    }

    const editInput = todoListContainer.querySelector(".edit-input");
    if (editInput) {
      editInput.focus();
      editInput.selectionStart = editInput.selectionEnd = editInput.value.length;
    }
  }

  function addTodo(inputElement) {
    const text = inputElement.value.trim();
    if (text) {
      const todoObj = {
        id: Date.now(),
        text: text,
        completed: false,
        isNew: true,
      };
      todosArr.push(todoObj);
      inputElement.value = "";
      saveAndRender();
    }
  }

  function completeTodo(todoId) {
    const todo = todosArr.find((item) => item.id == todoId);
    if (todo) {
      todo.completed = !todo.completed;
      saveAndRender();
    }
  }

  function deleteTodo(todoId) {
    const todoElement = document.getElementById(todoId);
    if (todoElement) {
      todoElement.classList.add("fade-out");
    }
    
    setTimeout(() => {
      todosArr = todosArr.filter((todo) => todo.id != todoId);
      saveAndRender();
    }, 400);
  }

  function editTodo(todoId) {
    const todo = todosArr.find((item) => item.id == todoId);
    if (todo) {
      todo.isEditing = true;
      render();
    }
  }

  function saveChanges(todoId, newText) {
    const todo = todosArr.find((item) => item.id == todoId);
    if (todo) {
      todo.text = newText;
      delete todo.isEditing;
      saveAndRender();
    }
  }

  main.addEventListener("click", (e) => {
    const t = e.target;
    const todoId = t.dataset.id;

    if (t.id === "add") {
      addTodo(t.previousElementSibling);
    } else if (t.classList.contains("check")) {
      completeTodo(todoId);
    } else if (t.classList.contains("delete-todo")) {
      deleteTodo(todoId);
    } else if (t.classList.contains("edit-todo")) {
      editTodo(todoId);
    }
  });

  addTodoContainer.addEventListener("keydown", (e) => {
    if(e.key === 'Enter' && e.target.classList.contains("add-todo")){
        console.log("its called")
        addTodo(e.target);
    }
  })

  todoListContainer.addEventListener("keydown", (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('edit-input')) {
      saveChanges(e.target.dataset.id, e.target.value);
    }
  });

  todoListContainer.addEventListener("blur", (e) => {
      if (e.target.classList.contains("edit-input")) {
        saveChanges(e.target.dataset.id, e.target.value);
      }
    }, true
  );

  render();
})();