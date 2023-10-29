export let taskList = [];
export const setTaskList = (tasks) => {
    taskList = tasks;
};
// ----------------------------- TESTS
// Add a new task to taskList array
export const addInput = (newTask) => {
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
export const removeInput = (taskName) => {
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
export const markTaskCompleted = (taskName) => {
    const taskToMark = taskList.find((task) => task.task === taskName);
    if (taskToMark) {
        taskToMark.isChecked = !taskToMark.isChecked;
    }
};
