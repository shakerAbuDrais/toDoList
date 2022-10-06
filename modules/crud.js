class Tasks {
  constructor() {
    this.tasks = [];
  }
}

const getTasks = () => {
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return this.tasks;
};

const addTask = (task) => {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const removeTask = (id) => {
  const tasks = getTasks();
  tasks.forEach((task, index) => {
    if (task.index === id) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export { getTasks, addTask, removeTask };
