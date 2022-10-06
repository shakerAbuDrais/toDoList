const Tasks = class {
  constructor(description, completed = false, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
    this.tasks = [
      {
        description: 'Go out for dinner',
        completed: false,
        index: 0,
      },
      {
        description: 'complete To Do test project',
        completed: false,
        index: 1,
      },
      {
        description: 'Go to the gym',
        completed: false,
        index: 2,
      },
    ];
  }

    // Populate the memeory with the task inut baswd on the index
    populateFields = () => {
      let i = -1;
      this.tasks.forEach((task) => {
        i += 1;
        task.index = i;
      });
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    };

    // Method to remove a selected task
    removeTask(task) {
      const result = this.tasks.filter((b) => b !== task.index);
      this.tasks = result;
      this.populateFields();
      this.displayTasks();
    }

    // Method to add a new task.
    // Return saved items  if its empty.
    addTask = (newTask) => {
      if (newTask.description === '') {
        return;
      }
      this.tasks.push(newTask);
      this.populateFields();
      this.displayTasks();
    };

    displayTasks = () => {
      const containerElement = document.querySelector('.container-todo');
      const ulElement = document.querySelector('.ul-item');
      ulElement.innerHTML = '';
      this.tasks.map((task) => {
        const li = document.createElement('li');
        const itemTaskElement = document.createElement('div');
        itemTaskElement.classList.add('item-element');
        const checkBoxContainer = document.createElement('div');
        checkBoxContainer.classList.add('checkbox-container');
        const label = document.createElement('label');
        const textInput = document.createElement('input');
        textInput.classList.add('text-input', 'hidden');
        const icon = document.createElement('div');
        icon.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
        icon.classList.add('icon-menu-container');
        li.classList.add(`li${task.index}`);
        const checkBox = document.createElement('input');
        const iconMenu = '<i class="fas fa-ellipsis-v"></i>';
        const iconDelete = '<i class="fas fa-trash-alt"></i>';
        checkBox.type = 'checkbox';
        checkBox.id = `check${task.index}`;
        textInput.value = task.description;
        label.innerHTML = task.description;
        checkBox.checked = task.completed;

        // Line through the given task if its check-boxed
        if (checkBox.checked) {
          label.style.textDecoration = 'line-through';
        }

        label.addEventListener('click', () => {
          label.classList.add('hidden');
          textInput.classList.remove('hidden');
          li.classList.add('editing');
          icon.innerHTML = iconDelete;
          icon.style.cursor = 'pointer';
          textInput.focus();
        });

        textInput.addEventListener('focus', () => {
          this.populateFields();
          icon.innerHTML = iconDelete;
          icon.style.cursor = 'pointer';
        });

        textInput.addEventListener('change', (e) => {
          task.description = e.target.value;
          label.innerHTML = task.description;
          this.populateFields();
          icon.innerHTML = iconDelete;
          icon.style.cursor = 'pointer';
        });

        textInput.addEventListener('blur', () => {
          label.classList.remove('hidden');
          textInput.classList.add('hidden');
          li.classList.remove('editing');
          setTimeout(() => {
            icon.innerHTML = iconMenu;
            icon.style.cursor = 'menu';
          }, 150);
        });

        // Action to be taken when the checkbox is selected
        checkBox.addEventListener('click', () => {
          if (checkBox.checked) {
            label.style.textDecoration = 'line-through';
            task.completed = checkBox.checked;
            this.populateFields();
          } else {
            label.style.textDecoration = 'none';
            task.completed = checkBox.checked;
            this.populateFields();
          }
        });

        // Action to remove the task when its selected
        icon.addEventListener('click', () => {
          if (icon.innerHTML === iconDelete) {
            this.removeTask(task);
            ulElement.removeChild(li);
          }
        });

        li.addEventListener('keyup', (e) => {
          if (e.key === 'Enter') {
            checkBox.focus();
            textInput.classList.add('hidden');
            label.classList.remove('hidden');
            li.classList.remove('editing');
          }
        });

        checkBoxContainer.append(checkBox, label, textInput);
        itemTaskElement.append(checkBoxContainer, icon);

        li.appendChild(itemTaskElement);
        ulElement.appendChild(li);
        return ulElement;
      });
      containerElement.appendChild(ulElement);
      return containerElement;
    };
};

export default Tasks;