import {
  Task,
  taskList,
  setTaskList,
  addInput,
  removeInput,
  markTaskCompleted,
} from "./todo-list.js";

// ----------------------------- MY CODE

//show new task in list
export const addInputOnClick = (event: Event) => {
  event.preventDefault(); // prevents page from refreshing when form is submited

  const taskNameElement = document.getElementById(
    "new-task-title"
  ) as HTMLInputElement;

  const taskName = taskNameElement?.value;

  // if we have a value, it adds it to the list and it renders to the page
  if (taskName != null) {
    addInput(taskName);
    renderListTask(taskList);
  }
  // Clear the input text after adding the task
  taskNameElement.value = "";
};

// changes value in checkbox
export const handleCheckboxChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.type === "checkbox") {
    const labelElement = target.nextElementSibling as HTMLLabelElement;
    const taskName = labelElement.textContent;

    // if there's a value, check it as true
    if (taskName) {
      markTaskCompleted(taskName);
      renderListTask(taskList);
    }
  }
};
// save task list in local storage
const saveTaskListToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem("taskList", JSON.stringify(tasks));
};

// draw html in page
export const renderListTask = (tasks: Task[]): void => {
  const ulList = document.getElementById("show-list");

  //clean list before rendering
  if (ulList) {
    ulList.innerHTML = "";
  }

  // add html when a new task is sent
  taskList.forEach((task: any) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = task.isChecked;

    const label = document.createElement("label");
    label.textContent = task.task;

    const btnDelete = document.createElement("button");
    btnDelete.type = "submit";
    btnDelete.textContent = "Eliminar de la lista";

    if (task.isChecked) {
      label.style.textDecoration = "line-through";
    } else {
      label.style.textDecoration = "none";
    }
    // adds input, label and btnDelete as li child
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(btnDelete);

    ulList?.appendChild(li);
  });

  // Save the updated taskList to localStorage. List will reset when refreshing the site
  saveTaskListToLocalStorage(tasks);
};

// runs when the web page is fully loaded.
window.onload = function () {
  // check if there is data in the LocalStorage
  const storedTaskList = localStorage.getItem("taskList");

  if (storedTaskList) {
    // converts to json
    setTaskList(JSON.parse(storedTaskList));
  }

  renderListTask(taskList);

  // handler triggers when the form is submitted and calls the addInputOnClick function to add a new task.
  document
    .getElementById("new-task-form")
    ?.addEventListener("submit", addInputOnClick);

  const ulList = document.getElementById("show-list");

  // handler is triggered when a change occurs and calls the handleCheckboxChange
  ulList?.addEventListener("change", handleCheckboxChange);

  ulList?.addEventListener("click", (event) => {
    // if it's a button
    if (event.target instanceof HTMLButtonElement) {
      // targets the label, the button previous element
      const labelElement = event.target
        .previousElementSibling as HTMLLabelElement;
      const taskName = labelElement.textContent;

      if (taskName) {
        removeInput(taskName);
        //render list after deleting
        renderListTask(taskList);
      }
    }
  });
};
