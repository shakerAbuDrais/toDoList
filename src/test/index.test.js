import Task from './index.js';

beforeAll(() => {
  document.body.innerHTML = `
  <div class="root">
    <div class="title">
        <p>Today's To Do</p><i class="fas fa-sync-alt"></i>
    </div>
    <div class="container-todo">
        <input class='input-element' placeholder="Add to your list..." />
        <ul class='ul-item'></ul>
    </div>
</div>`;
});
const objTasks = new Task();
describe('Add and remove task', () => {
  test('AddTask function Add new el to the array', () => {
    objTasks.addTask({
      description: 'New Task Added',
      completed: false,
      index: 0,
    });
    const liElement = document.querySelectorAll('li');
    expect(liElement[3].textContent).toEqual('New Task Added');
  });
  test('Test Add Task +1 DOM li el', () => {
    objTasks.addTask({
      description: 'New Task Added 3',
      completed: false,
      index: 0,
    });
    const liElement = document.querySelectorAll('li');
    expect(liElement.length).toEqual(5);
  });
  test('Check the Decs of Specicifc Index of the Array', () => {
    objTasks.addTask({
      description: 'New Task Added 4',
      completed: false,
      index: 0,
    });
    const liElement = document.querySelectorAll('li');
    expect(liElement[5].textContent).toEqual('New Task Added 4');
  });

  test('To be Falsy Check for a specific element', () => {
    objTasks.addTask({
      description: 'New Task Added 5',
      index: 0,
    });
    expect(objTasks.tasks[6].completed).toBeFalsy();
  });

  test('Remove Function Test', () => {
    const ulElement = document.querySelector('.ul-item');
    objTasks.removeTask({
      description: 'Clean the House',
      completed: false,
      index: 0,
    });
    expect(ulElement.childElementCount).toEqual(7);
  });
  test('Should  delete an item', () => {
    const ulElement = document.querySelector('.ul-item');
    objTasks.removeTask({
      description: 'Task from test 4',
      completed: false,
      index: 0,
    });
    expect(ulElement.childElementCount).toEqual(7);
  });
  test('Checking if Empty Desc is added to the DOM', () => {
    const ulElement = document.querySelector('.ul-item');
    objTasks.addTask({
      description: '',
      completed: false,
      index: 0,
    });
    expect(ulElement.childElementCount).toEqual(7);
  });
});

describe('LocalStorage Test', () => {
  test('is it saving to localstorage', () => {
    expect(localStorage.length).toBe(1);
  });
  test('"tasks" array should be saved in localStorage ', () => {
    expect(Object.getOwnPropertyNames(localStorage)[6]).toBe('tasks');
  });
});
