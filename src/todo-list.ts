export interface Task {
  task: string;
  isChecked: boolean;
}
export let taskList: Task[] = [];

//TESTS
// Add a new task to taskList array
export const addInput = (newTask: string): Task[] => {
  const taskExists = taskList.some((task) => task.task === newTask);

  if (newTask === "") {
    alert("Tarea vacía");
    return taskList;
  }

  if (taskExists) {
    alert("La tarea ya está en la lista");
    return taskList;
  }

  taskList.push({
    task: newTask,
    isChecked: false,
  });

  return taskList;
};

// remove a task from list
export const removeInput = (taskName: string): Task[] => {
  taskList = taskList.filter((task) => {
    if (task.task === taskName && !task.isChecked) {
      alert("Tarea no marcada");
      return true;
    }
    if (task.task === taskName && task.isChecked) {
      return false;
    }
    return true;
  });
  return taskList;
};

// Mark task as completed
export const markTaskCompleted = (taskName: string): void => {
  const taskToMark = taskList.find((task) => task.task === taskName);

  if (taskToMark) {
    taskToMark.isChecked = true;
  }
};

//MY CODE

//show new task in list
export const addInputOnClick = (event: Event) => {
  event.preventDefault();
  const taskNameElement = document.getElementById(
    "new-task-title"
  ) as HTMLInputElement;

  const taskName = taskNameElement?.value;

  if (taskName != null) {
    addInput(taskName);
    renderListTask(taskList);
  }
  // Clear the input text after adding the task
  taskNameElement.value = "";
};

export const handleCheckboxChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.type === "checkbox") {
    const labelElement = target.nextElementSibling as HTMLLabelElement;
    const taskName = labelElement.textContent;
    if (taskName) {
      markTaskCompleted(taskName);
    }
  }
};

// draw html in page
export const renderListTask = (tasks: Task[]): void => {
  const ulList = document.getElementById("show-list");

  //clean list before rendering
  if (ulList) {
    ulList.innerHTML = "";
  }

  taskList.forEach((task) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = task.isChecked;
    const btnDelete = document.createElement("button");
    btnDelete.type = "submit";
    btnDelete.textContent = "Eliminar de la lista";
    const label = document.createElement("label");
    label.textContent = task.task;

    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(btnDelete);

    ulList?.appendChild(li);
  });

  // Save the updated taskList to localStorage. so list will not desapear when refreshing the  site
  saveTaskListToLocalStorage(tasks);
};

const saveTaskListToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem("taskList", JSON.stringify(tasks));
};

// runs when the web page is fully loaded.
window.onload = function () {
  const storedTaskList = localStorage.getItem("taskList");
  if (storedTaskList) {
    taskList = JSON.parse(storedTaskList);
  }

  renderListTask(taskList);
  document
    .getElementById("new-task-form")
    ?.addEventListener("submit", addInputOnClick);
  const ulList = document.getElementById("show-list");
  ulList?.addEventListener("change", handleCheckboxChange);
  ulList?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLButtonElement) {
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
