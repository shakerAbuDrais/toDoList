import './style.css';

const tasks = [
  {
    description: 'Clean the house',
    completed: false,
    index: 0,
  },
  {
    description: 'Start working on JS',
    completed: false,
    index: 1,
  },
  {
    description: 'Take a break',
    completed: false,
    index: 2,
  },
];

const form = document.querySelector('.form');
const toDoItem = document.createElement('div');
const btn = document.createElement('p');
btn.classList.add('btn');
btn.innerHTML = 'Clear All Completed';

tasks.forEach((el) => {
  window.addEventListener('load', (() => {
    toDoItem.innerHTML += `<input type="checkbox" id= ${el.index} name="item${el.index}" value="">
      <label for="item${el.index}"> ${el.description}</label><span id="dots">&#8942;</span><br> <hr>`;
    form.appendChild(toDoItem);
    form.appendChild(btn);
  }));
});