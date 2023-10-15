"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markTaskCompleted = exports.removeInput = exports.addInput = exports.setTaskList = exports.taskList = void 0;
exports.taskList = [];
const setTaskList = (tasks) => {
    exports.taskList = tasks;
};
exports.setTaskList = setTaskList;
// ----------------------------- TESTS
// Add a new task to taskList array
const addInput = (newTask) => {
    const taskExists = exports.taskList.some((task) => task.task === newTask);
    if (newTask === "") {
        alert("Tarea vacía");
        return exports.taskList;
    }
    if (taskExists) {
        alert("La tarea ya está en la lista");
        return exports.taskList;
    }
    exports.taskList.push({
        task: newTask,
        isChecked: false,
    });
    return exports.taskList;
};
exports.addInput = addInput;
// remove a task from list
const removeInput = (taskName) => {
    exports.taskList = exports.taskList.filter((task) => {
        if (task.task === taskName && !task.isChecked) {
            alert("Tarea no marcada");
            return true;
        }
        if (task.task === taskName && task.isChecked) {
            return false;
        }
        return true;
    });
    return exports.taskList;
};
exports.removeInput = removeInput;
// Mark task as completed
const markTaskCompleted = (taskName) => {
    const taskToMark = exports.taskList.find((task) => task.task === taskName);
    if (taskToMark) {
        taskToMark.isChecked = true;
    }
};
exports.markTaskCompleted = markTaskCompleted;
