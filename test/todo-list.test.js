"use strict";
/*-

- Permetre marcar una tasca com a completada.

- Permetre eliminar una tasca de la llista.

- Mostrar la llista de tasques. */
Object.defineProperty(exports, "__esModule", { value: true });
const { it, expect } = require("@jest/globals");
const todo_list_1 = require("../src/todo-list");
describe("add task to list", () => {
    it("should thow error if input is empty", () => {
        expect(() => (0, todo_list_1.addInput)("")).toThrow("Empty input");
    });
    it("should not add task if it is already in list", () => {
        expect(() => (0, todo_list_1.addInput)("task1")).toThrow("Task already exists");
    });
    it("add new task if does not exist", () => {
        (0, todo_list_1.addInput)("task4");
        expect(todo_list_1.taskList.some((task) => task.task === "task4")).toBe(true);
    });
});
describe("remove task to list", () => {
    it("removes task1 from taskList when checked", () => {
        //task list initial length
        const initialLength = todo_list_1.taskList.length;
        // call task1 to delete
        (0, todo_list_1.removeInput)("task1");
        // we check if length is -1 as task1 was deleted
        expect(todo_list_1.taskList.length).toBe(initialLength - 1);
        //confirm task1 is no longer on list
        expect(todo_list_1.taskList.some((task) => task.task === "task1")).toBe(false);
    });
});
describe("modify task", () => {
    it("allows to modify if task1 exist and isCheked is true", () => {
        const modifiedTasklist = (0, todo_list_1.modifyTask)(todo_list_1.taskList, "task1", "newDescription");
        expect(modifiedTasklist).not.toEqual(todo_list_1.taskList.find((task) => task.task === "task1" && task.isChecked === true));
    });
    it("does not modify if task does not exist or isChecked is false", () => {
        const modifiedTaskList = (0, todo_list_1.modifyTask)(todo_list_1.taskList, "task2", "newDescription");
        expect(modifiedTaskList).toEqual(todo_list_1.taskList); // Ensure the list remains unchanged
    });
});
