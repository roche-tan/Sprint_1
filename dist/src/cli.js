import inquirer from "inquirer";
import { taskList, addInput, removeInput, markTaskCompleted, } from "./todo-list.js";
const runCLI = () => {
    inquirer
        .prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: [
                "Show list",
                "Add to list",
                "Complete task",
                "Delete task",
                "Exit",
            ],
        },
    ])
        .then((answers) => {
        switch (answers.action) {
            case "Show list":
                showList();
                break;
            case "Add to list":
                addToDo();
                break;
            case "Complete task":
                completeTask();
                break;
            case "Delete task":
                deleteTask();
                break;
            case "Exit":
                process.exit();
        }
    });
};
const showList = () => {
    console.log("Task list:");
    taskList.forEach((task, index) => {
        console.log(`${index + 1}. ${task.task} - ${task.isChecked ? "Completed" : "Pending"}`);
    });
    runCLI();
};
const addToDo = () => {
    inquirer
        .prompt([
        {
            type: "input",
            name: "newTask",
            message: "Add new task:",
        },
    ])
        .then((answers) => {
        addInput(answers.newTask);
        runCLI();
    });
};
const completeTask = () => {
    const choices = taskList.map((task, index) => `${index + 1}. ${task.task}`);
    inquirer
        .prompt([
        {
            type: "list",
            name: "selectedTask",
            message: "Select task to complete:",
            choices,
        },
    ])
        .then((answers) => {
        const taskName = answers.selectedTask.split(". ")[1];
        markTaskCompleted(taskName);
        runCLI();
    });
};
const deleteTask = () => {
    const choices = taskList.map((task, index) => `${index + 1}. ${task.task}`);
    inquirer
        .prompt([
        {
            type: "list",
            name: "selectedTask",
            message: "Select task to delete:",
            choices,
        },
    ])
        .then((answers) => {
        const taskName = answers.selectedTask.split(". ")[1];
        confirmAndDeleteTask(taskName);
    });
};
const confirmAndDeleteTask = (taskName) => {
    inquirer
        .prompt([
        {
            type: "confirm",
            name: "confirmDelete",
            message: `Are you sure you want to delete "${taskName}"?`,
        },
    ])
        .then((response) => {
        if (response.confirmDelete) {
            removeInput(taskName);
        }
        runCLI();
    });
};
runCLI();
