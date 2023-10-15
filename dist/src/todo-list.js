"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderListTask = exports.handleCheckboxChange = exports.addInputOnClick = exports.markTaskCompleted = exports.removeInput = exports.addInput = exports.taskList = void 0;
exports.taskList = [];
//TESTS
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
//MY CODE
//show new task in list
const addInputOnClick = (event) => {
    event.preventDefault();
    const taskNameElement = document.getElementById("new-task-title");
    const taskName = taskNameElement === null || taskNameElement === void 0 ? void 0 : taskNameElement.value;
    if (taskName != null) {
        (0, exports.addInput)(taskName);
        (0, exports.renderListTask)(exports.taskList);
    }
    // Clear the input text after adding the task
    taskNameElement.value = "";
};
exports.addInputOnClick = addInputOnClick;
const handleCheckboxChange = (event) => {
    const target = event.target;
    if (target.type === "checkbox") {
        const labelElement = target.nextElementSibling;
        const taskName = labelElement.textContent;
        if (taskName) {
            (0, exports.markTaskCompleted)(taskName);
        }
    }
};
exports.handleCheckboxChange = handleCheckboxChange;
// draw html in page
const renderListTask = (tasks) => {
    const ulList = document.getElementById("show-list");
    //clean list before rendering
    if (ulList) {
        ulList.innerHTML = "";
    }
    exports.taskList.forEach((task) => {
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
        ulList === null || ulList === void 0 ? void 0 : ulList.appendChild(li);
    });
    // Save the updated taskList to localStorage. so list will not desapear when refreshing the  site
    saveTaskListToLocalStorage(tasks);
};
exports.renderListTask = renderListTask;
const saveTaskListToLocalStorage = (tasks) => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
};
// runs when the web page is fully loaded.
window.onload = function () {
    var _a;
    const storedTaskList = localStorage.getItem("taskList");
    if (storedTaskList) {
        exports.taskList = JSON.parse(storedTaskList);
    }
    (0, exports.renderListTask)(exports.taskList);
    (_a = document
        .getElementById("new-task-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", exports.addInputOnClick);
    const ulList = document.getElementById("show-list");
    ulList === null || ulList === void 0 ? void 0 : ulList.addEventListener("change", exports.handleCheckboxChange);
    ulList === null || ulList === void 0 ? void 0 : ulList.addEventListener("click", (event) => {
        if (event.target instanceof HTMLButtonElement) {
            const labelElement = event.target
                .previousElementSibling;
            const taskName = labelElement.textContent;
            if (taskName) {
                (0, exports.removeInput)(taskName);
                //render list after deleting
                (0, exports.renderListTask)(exports.taskList);
            }
        }
    });
};
