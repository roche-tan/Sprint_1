"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderListTask = exports.handleCheckboxChange = exports.addInputOnClick = exports.markTaskCompleted = exports.removeInput = exports.addInput = exports.taskList = void 0;
exports.taskList = [];
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
// ----------------------------- MY CODE
//show new task in list
const addInputOnClick = (event) => {
    event.preventDefault(); // prevents page from refreshing when form is submited
    const taskNameElement = document.getElementById("new-task-title");
    const taskName = taskNameElement === null || taskNameElement === void 0 ? void 0 : taskNameElement.value;
    // if we have a value, it adds it to the list and it renders to the page
    if (taskName != null) {
        (0, exports.addInput)(taskName);
        (0, exports.renderListTask)(exports.taskList);
    }
    // Clear the input text after adding the task
    taskNameElement.value = "";
};
exports.addInputOnClick = addInputOnClick;
// changes value in checkbox
const handleCheckboxChange = (event) => {
    const target = event.target;
    if (target.type === "checkbox") {
        const labelElement = target.nextElementSibling;
        const taskName = labelElement.textContent;
        // if there's a value, check it as true
        if (taskName) {
            (0, exports.markTaskCompleted)(taskName);
        }
    }
};
exports.handleCheckboxChange = handleCheckboxChange;
// save task list in local storage
const saveTaskListToLocalStorage = (tasks) => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
};
// draw html in page
const renderListTask = (tasks) => {
    const ulList = document.getElementById("show-list");
    //clean list before rendering
    if (ulList) {
        ulList.innerHTML = "";
    }
    // add html when a new task is sent
    exports.taskList.forEach((task) => {
        const li = document.createElement("li");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = task.isChecked;
        const label = document.createElement("label");
        label.textContent = task.task;
        const btnDelete = document.createElement("button");
        btnDelete.type = "submit";
        btnDelete.textContent = "Eliminar de la lista";
        // adds input, label and btnDelete as li child
        li.appendChild(input);
        li.appendChild(label);
        li.appendChild(btnDelete);
        ulList === null || ulList === void 0 ? void 0 : ulList.appendChild(li);
    });
    // Save the updated taskList to localStorage. List will reset when refreshing the site
    saveTaskListToLocalStorage(tasks);
};
exports.renderListTask = renderListTask;
// runs when the web page is fully loaded.
window.onload = function () {
    var _a;
    // check if there is data in the LocalStorage
    const storedTaskList = localStorage.getItem("taskList");
    if (storedTaskList) {
        // converts to json
        exports.taskList = JSON.parse(storedTaskList);
    }
    (0, exports.renderListTask)(exports.taskList);
    // handler triggers when the form is submitted and calls the addInputOnClick function to add a new task.
    (_a = document
        .getElementById("new-task-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", exports.addInputOnClick);
    const ulList = document.getElementById("show-list");
    // handler is triggered when a change occurs and calls the handleCheckboxChange
    ulList === null || ulList === void 0 ? void 0 : ulList.addEventListener("change", exports.handleCheckboxChange);
    ulList === null || ulList === void 0 ? void 0 : ulList.addEventListener("click", (event) => {
        // if it's a button
        if (event.target instanceof HTMLButtonElement) {
            // targets the label, the button previous element
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
