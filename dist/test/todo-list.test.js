/*-

- Permetre marcar una tasca com a completada.

- Permetre eliminar una tasca de la llista.

- Mostrar la llista de tasques. */
const { it, expect } = require("@jest/globals");
import { taskList, addInput, removeInput, modifyTask } from "../src/todo-list";
describe("add task to list", () => {
    it("should thow error if input is empty", () => {
        expect(() => addInput("")).toThrow("Empty input");
    });
    it("should not add task if it is already in list", () => {
        expect(() => addInput("task1")).toThrow("Task already exists");
    });
    it("add new task if does not exist", () => {
        addInput("task4");
        expect(taskList.some((task) => task.task === "task4")).toBe(true);
    });
});
describe("remove task to list", () => {
    it("removes task1 from taskList when checked", () => {
        //task list initial length
        const initialLength = taskList.length;
        // call task1 to delete
        removeInput("task1");
        // we check if length is -1 as task1 was deleted
        expect(taskList.length).toBe(initialLength - 1);
        //confirm task1 is no longer on list
        expect(taskList.some((task) => task.task === "task1")).toBe(false);
    });
});
describe("modify task", () => {
    it("allows to modify if task1 exist and isCheked is true", () => {
        const modifiedTasklist = modifyTask(taskList, "task1", "newDescription");
        expect(modifiedTasklist).not.toEqual(taskList.find((task) => task.task === "task1" && task.isChecked === true));
    });
    it("does not modify if task does not exist or isChecked is false", () => {
        const modifiedTaskList = modifyTask(taskList, "task2", "newDescription");
        expect(modifiedTaskList).toEqual(taskList); // Ensure the list remains unchanged
    });
});
