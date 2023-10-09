export const taskList = [
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

export const addInput = (newTask: string): void => {
  if (newTask === "") throw new Error("Empty input");

  const taskExists = taskList.some((task) => task.task === newTask);

  if (taskExists) throw new Error("Task already exists");

  taskList.push({
    task: newTask,
    isChecked: false,
  });
};

export const removeInput = (taskName: string): void => {
  const taskIndex = taskList.findIndex(
    (task) => task.task === taskName && task.isChecked === true
  );

  if (taskIndex != -1) {
    taskList.splice(taskIndex, 1);
  }
};

export const modifyInput = (taskName: string): void => {
  const taskIndex = taskList.findIndex((task) => task.task === taskName);

  //if task doesn't exist or isChecked != true
  if (taskIndex === -1) throw new Error("Task not checked");

  //checked if task is checked
  if (!taskList[taskIndex].isChecked) throw new Error("Task not checked");

  //if conditions apply, give new value
  taskList[taskIndex].task = "nuevoValor";
};
