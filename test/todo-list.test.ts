const { it, expect, describe } = require("@jest/globals");

import {
  taskList,
  addInput,
  removeInput,
  markTaskCompleted,
} from "../src/todo-list";

describe("add task to array list", () => {
  it("should thow error if input is empty", () => {
    expect(() => addInput("")).toThrow("Input can not be empty");
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

describe("Mark task as completed", () => {
  it("marks task2 as completed", () => {
    markTaskCompleted("task2");
    const task2 = taskList.find((task) => task.task === "task2");
    expect(task2?.isChecked).toBe(true);
  });

  it("Error if task is not found", () => {
    expect(() => markTaskCompleted("")).toThrow("Task not found");
  });
});
