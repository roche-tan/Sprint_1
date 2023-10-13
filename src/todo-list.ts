//const form = document.getElementById("new-task-form") as HTMLFormElement | null; is the same as:
// const form = document.querySelector<HTMLFormElement>("#new-task-form");
// const input = document.querySelector<HTMLInputElement>("#new-task-title");
// const list = document.querySelector<HTMLUListElement>("#show-list");

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

// Returns a task list as an array of strings(use of maps)
export const showTaskList = (taskList: Task[]): string[] => {
  return taskList.map((task) => task.task);
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
