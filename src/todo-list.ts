export interface Task {
  task: string;
  isChecked: boolean;
}

export let taskList: Task[] = [];

export const setTaskList = (tasks:Task[]):void =>{
  taskList = tasks;
}

// ----------------------------- TESTS
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
