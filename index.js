// TASK: import helper functions from utils
import { 
  getTasks, 
  createNewTask, 
  patchTask, 
  putTask, 
  deleteTask 
} from './utils/taskFunctions.js';

// TASK: import initialData
import { initialData } from "./initialData.js";

/*************************************************************************************************************************************************
 * FIX BUGS!!!
 * **********************************************************************************************************************************************/

// Function checks if local storage already has data, if not it loads initialData to localStorage
function initializeData() {
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify(initialData)); 
    localStorage.setItem('showSideBar', 'true')
  } else {
    console.log('Data already exists in localStorage');
  }
}

// Call initializeData function to execute the initialization logic
initializeData();

// TASK: Get elements from the DOM
const elements = {
  // Get the navigation sidebar elements
  sideBar: document.querySelector('.side-bar'),
  sideLogoDiv: document.getElementById('side-logo-div'),
  logo: document.getElementById('logo'),
  boardsNavLinksDiv: document.getElementById('boards-nav-links-div'),
  headlineSidepanel: document.getElementById('headline-sidepanel'),
  sideBarBottom: document.querySelector('.side-bar-bottom'),
  toggleDiv: document.querySelector('.toggle-div'),
  iconDark: document.getElementById('icon-dark'),
  themeSwitch: document.getElementById('switch'),
  labelCheckboxTheme: document.getElementById('label-checkbox-theme'),
  iconLight: document.getElementById('icon-light'),
  hideSideBarDiv: document.querySelector('.hide-side-bar-div'),
  hideSideBarBtn: document.getElementById('hide-side-bar-btn'),
  showSideBarBtn: document.getElementById('show-side-bar-btn'),

  // Get the main layout elements
  layout: document.getElementById('layout'),
  header: document.getElementById('header'),
  headerNameDiv: document.querySelector('.header-name-div'),
  logoMobile: document.querySelector('.logo-mobile'),
  headerBoardName: document.getElementById('header-board-name'),
  dropDownBtn: document.getElementById('dropdownBtn'),
  dropDownIcon: document.getElementById('dropDownIcon'),
  createNewTaskBtn: document.getElementById('add-new-task-btn'),
  editBoardBtn: document.getElementById('edit-board-btn'),
  threeDotsIcon: document.getElementById('three-dots-icon'),
  editBoardDiv: document.getElementById('editBoardDiv'),
  deleteBoardBtn: document.getElementById('deleteBoardBtn'),

  // Get the task columns elements
  cardColumnMain: document.querySelector('.card-column-main'),
  columnDivs: document.querySelectorAll('.column-div'),
  todoHeadDiv: document.getElementById('todo-head-div'),
  todoDot: document.getElementById('todo-dot'),
  todoText: document.getElementById('toDoText'),
  tasksContainer: document.querySelector('.tasks-container'),
  doingHeadDiv: document.getElementById('doing-head-div'),
  doingDot: document.getElementById('doing-dot'),
  doingText: document.getElementById('doingText'),
  tasksContainer: document.querySelector('.tasks-container'),
  doneHeadDiv: document.getElementById('done-head-div'),
  doneDot: document.getElementById('done-dot'),
  doneText: document.getElementById('doneText'),

  // Get the new task modal elements
  modalWindow: document.getElementById('new-task-modal-window'),
  modalTitle: document.querySelector('.modal-title'),
  inputDiv: document.querySelector('.input-div'),
  modalTitleInput: document.getElementById('modal-title-input'),
  titleInput: document.getElementById('title-input'),
  modalDescInput: document.getElementById('modal-desc-input'),
  descInput: document.getElementById('desc-input'),
  modalSelectStatus: document.getElementById('modal-select-status'),
  selectStatus: document.getElementById('select-status'),
  btnGroup: document.querySelector('.button-group'),
  createTaskBtn: document.getElementById('create-task-btn'),
  cancelAddTaskBtn: document.getElementById('cancel-add-task-btn'),

  // Get the edit task modal elements
  editTaskModal: document.querySelector('.edit-task-modal-window'),
  editTaskForm: document.getElementById('edit-task-form'),
  editTaskHeader: document.getElementById('edit-task-header'),
  editTaskTitleInput: document.getElementById('edit-task-title-input'),
  editBtn: document.getElementById('edit-btn'),
  editTaskDivs: document.querySelector('.edit-task-div'),
  editTaskDescInput: document.getElementById('edit-task-desc-input'),
  labelModalWindow: document.querySelector('.label-modal-window'),
  editSelectStatus: document.getElementById('edit-select-status'),
  saveTaskChangesBtn: document.getElementById('save-task-changes-btn'),
  cancelEditBtn: document.getElementById('cancel-edit-btn'),
  deleteTaskBtn: document.getElementById('delete-task-btn'),

  // Get the filter div
  filterDiv: document.getElementById('filterDiv')
}

let activeBoard = ""

// Extracts unique board names from tasks
// TASK: FIX BUGS
function fetchAndDisplayBoardsAndTasks() {
  const tasks = getTasks();
  const boards = [...new Set(tasks.map(task => task.board).filter(Boolean))];
  displayBoards(boards);
  if (boards.length > 0) {
    const localStorageBoard = JSON.parse(localStorage.getItem("activeBoard"));
    activeBoard = localStorageBoard ? localStorageBoard :  boards[0]; 
    elements.headerBoardName.textContent = activeBoard
    styleActiveBoard(activeBoard)
    refreshTasksUI();
  }
}



// Creates different boards in the DOM
// TASK: Fix Bugs
function displayBoards(boards) {
  const boardsContainer = document.getElementById("boards-nav-links-div");
  boardsContainer.innerHTML = ''; // Clears the container
  boards.forEach(board => {
    const boardElement = document.createElement("button");
    boardElement.textContent = board;
    boardElement.classList.add("board-btn");
    boardElement.addEventListener("click", () => { 
      elements.headerBoardName.textContent = board;
      filterAndDisplayTasksByBoard(board);
      activeBoard = board //assigns active board
      localStorage.setItem("activeBoard", JSON.stringify(activeBoard))
      styleActiveBoard(activeBoard)
    });
    boardsContainer.appendChild(boardElement);
  });

}

// Filters tasks corresponding to the board name and displays them on the DOM.

const columnTile = {
  todo: 'TODO',
  doing: 'DOING',
  done: 'DONE'
}

// TASK: Fix Bugs
function filterAndDisplayTasksByBoard(boardName) {
  const tasks = getTasks(); // Fetch tasks from a simulated local storage function
  const filteredTasks = tasks.filter(task => task.board === boardName);

  // Ensure the column titles are set outside of this function or correctly initialized before this function runs

  elements.columnDivs.forEach(column => {
    const status = column.getAttribute("data-status");
    const select = columnTile[status];
    // Reset column content while preserving the column title
    column.innerHTML = `<div class="column-head-div">
                          <span class="dot" id="${status}-dot"></span>
                          <h4 class="columnHeader">${select.toUpperCase()}</h4>
                        </div>`;

    const tasksContainer = document.createElement("div");
    column.appendChild(tasksContainer);

    filteredTasks.filter(task => task.status === status).forEach(task => { 
      const taskElement = document.createElement("div");
      taskElement.classList.add("task-div");
      taskElement.textContent = task.title;
      taskElement.setAttribute('data-task-id', task.id);

      // Listen for a click event on each task and open a modal
      taskElement.addEventListener("click", () => { 
        openEditTaskModal(task);
      });

      tasksContainer.appendChild(taskElement);
    });
  });
}


function refreshTasksUI() {
  filterAndDisplayTasksByBoard(activeBoard);
}

// Styles the active board by adding an active class
// TASK: Fix Bugs
function styleActiveBoard(boardName) {
  document.querySelectorAll('.board-btn').forEach(btn => { 
    
    if(btn.textContent === boardName) {
      btn.classList.add('active') 
    }
    else {
      btn.classList.remove('active'); 
    }
  });
}


function addTaskToUI(task) {
  const column = document.querySelector(`.column-div[data-status="${task.status}"]`); 
  if (!column) {
    console.error(`Column not found for status: ${task.status}`);
    return;
  }

  let tasksContainer = column.querySelector('.tasks-container');
  if (!tasksContainer) {
    console.warn(`Tasks container not found for status: ${task.status}, creating one.`);
    tasksContainer = document.createElement('div');
    tasksContainer.className = 'tasks-container';
    column.appendChild(tasksContainer);
  }

  const taskElement = document.createElement('div');
  taskElement.className = 'task-div';
  taskElement.textContent = task.title; // Modify as needed
  taskElement.setAttribute('data-task-id', task.id);
  
  tasksContainer.appendChild(taskElement); 
}



function setupEventListeners() {
  // Cancel editing task event listener
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  cancelEditBtn.addEventListener("click", () => toggleModal(false, elements.editTaskModal));

  // Cancel adding new task event listener
  const cancelAddTaskBtn = document.getElementById('cancel-add-task-btn');
  cancelAddTaskBtn.addEventListener('click', () => {
    toggleModal(false);
    elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
  });

  // Clicking outside the modal to close it
  elements.filterDiv.addEventListener('click', () => {
    toggleModal(false);
    elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
  });

  // Show sidebar event listener
  elements.hideSideBarBtn.addEventListener("click", () => toggleSidebar(false));
  elements.showSideBarBtn.addEventListener("click", () => toggleSidebar(true));
  elements.showSideBarBtn.style.display = 'block';

  // Theme switch event listener
  elements.themeSwitch.addEventListener('change', toggleTheme);

  // Show Add New Task Modal event listener
  elements.createNewTaskBtn.addEventListener('click', () => {
    toggleModal(true);
    elements.filterDiv.style.display = 'block'; // Also show the filter overlay
  });

  // Add new task form submission event listener
  elements.modalWindow.addEventListener('submit',  (event) => {
    addTask(event)
  });
}

// Toggles tasks modal
// Task: Fix bugs
function toggleModal(show, modal = elements.modalWindow) {
  modal.style.display = show ? 'block' : 'none'; 
}

/*************************************************************************************************************************************************
 * COMPLETE FUNCTION CODE
 * **********************************************************************************************************************************************/

function addTask(event) {
  event.preventDefault(); 

  //Assign user input to the task object
    const task = {
      id: '',
      title: elements.titleInput.value,
      description: elements.descInput.value,
      status: elements.selectStatus.value,
      board: activeBoard,
    };
    const newTask = createNewTask(task);
    if (newTask) {
      addTaskToUI(newTask);
      toggleModal(false);
      elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
      event.target.reset();
      refreshTasksUI();
    }
}


function toggleSidebar(show) {
 if (show) {
  elements.sideBar.style.display = 'block';
  elements.showSideBarBtn.style.display = 'none';
 } else {
  elements.sideBar.style.display = 'none';
  elements.showSideBarBtn.style.display = 'block';
 }

 localStorage.setItem("showSideBar", show);
}

elements.sideBarBottom.style.paddingTop = "300px"

function toggleTheme() {
  const isLightTheme = document.body.classList.contains('light-theme');
  document.body.classList.toggle('light-theme');
  localStorage.setItem('light-theme', !isLightTheme ? "enabled" : "disabled");

  if(isLightTheme) {
    localStorage.setItem('logo-theme', './assets/logo-dark.svg')
    localStorage.setItem('light-theme', 'disabled')
  } else {
    localStorage.setItem('logo-theme', './assets/logo-light.svg')
    localStorage.setItem('light-theme', 'enabled')
  }

  elements.logo.src = localStorage.getItem('logo-theme');

}



function openEditTaskModal(task) {
  // Set task details in modal inputs
  elements.editTaskTitleInput.value = task.title;
  elements.editTaskDescInput.value = task.description;
  elements.editSelectStatus.value = task.status;
  // Get button elements from the task modal
  // Call saveTaskChanges upon click of Save Changes button
  elements.saveTaskChangesBtn.addEventListener("click", () => {
    saveTaskChanges(task.id);
    toggleModal(false, elements.editTaskModal);
    refreshTasksUI();
  })

  // Delete task using a helper function and close the task modal
  elements.deleteTaskBtn.addEventListener("click", () => {
    deleteTask(task.id);
    toggleModal(false, elements.editTaskModal);
    refreshTasksUI();
  })

  toggleModal(true, elements.editTaskModal); // Show the edit task modal
}

function saveTaskChanges(taskId) {
  // Get new user inputs
  

  // Create an object with the updated task details
  const UpdatedTaskDetails = {
    id: taskId,
    title: elements.editTaskTitleInput.value,
    description: elements.editTaskDescInput.value,
    status: elements.editSelectStatus.value,
    board: activeBoard,
  }

  // Update task using a hlper functoin
  putTask(taskId, UpdatedTaskDetails);

  // Close the modal and refresh the UI to reflect the changes
  toggleModal(false, elements.editTaskModal);
  refreshTasksUI();
}

/*************************************************************************************************************************************************/

document.addEventListener('DOMContentLoaded', function() {
  init(); // init is called after the DOM is fully loaded
});

function init() {
  if (localStorage.getItem('logo-theme') === './assets/logo-light.svg'){
    elements.logo.src = './assets/logo-light.svg';
  }
  setupEventListeners();
  const showSidebar = localStorage.getItem('showSideBar') === 'true';
  toggleSidebar(showSidebar);
  const isLightTheme = localStorage.getItem('light-theme') === 'enabled';
  document.body.classList.toggle('light-theme', isLightTheme);
  elements.themeSwitch.checked = isLightTheme;
  fetchAndDisplayBoardsAndTasks(); // Initial display of boards and tasks
}