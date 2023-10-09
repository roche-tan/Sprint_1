export const taskList = [
  {
    task: "task1",
    isChecked: false,
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

export const addInput = (newTask: string): void => {
  if (newTask === "") throw new Error("Empty input");

  const taskExists = taskList.some((task) => task.task === newTask);

  if (taskExists) {
    throw new Error("Task already exists");
  }

  taskList.push({
    task: newTask,
    isChecked: false,
  });
};

export const removeInput = (taskName: string): void => {
  const taskIndex = taskList.findIndex((task) => task.task === taskName);

  if (taskIndex != -1) {
    taskList.splice(taskIndex, 1);
  }
};