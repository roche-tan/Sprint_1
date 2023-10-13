interface Task {
  task: string;
  isChecked: boolean;
}

export let taskList: Task[] = [
  {
    task: "task1",
    isChecked: true,
  },
  {
    task: "task2",
    isChecked: false,
  },
  {
    task: "task3",
    isChecked: false,
  },
];
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
  console.log("hola adios");
};

// Add a new task to list
export const addInput = (newTask: string): void => {
  const taskExists = taskList.some((task) => task.task === newTask);

  if (newTask === "") throw new Error("Input can not be empty");

  if (taskExists) throw new Error("Task already exists");

  taskList.push({
    task: newTask,
    isChecked: false,
  });
};

// remove a task from list
export const removeInput = (taskName: string): void => {
  taskList = taskList.filter(
    (task) => !(task.task === taskName && task.isChecked)
  );
};

// Mark task as completed
export const markTaskCompleted = (taskName: string): void => {
  const taskToMark = taskList.find((task) => task.task === taskName);

  if (!taskToMark) {
    throw new Error("Task not found");
  }
  taskToMark.isChecked = true;
};

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
};

window.onload = function () {
  renderListTask(taskList);
  document
    .getElementById("new-task-form")
  ?.addEventListener("submit", addInputOnClick);
};
