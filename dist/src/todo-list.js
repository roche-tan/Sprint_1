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
export const addInput = (newTask) => {
    if (newTask === "")
        throw new Error("Empty input");
    const taskExists = taskList.some((task) => task.task === newTask);
    if (taskExists)
        throw new Error("Task already exists");
    taskList.push({
        task: newTask,
        isChecked: false,
    });
};
export const removeInput = (taskName) => {
    const taskIndex = taskList.findIndex((task) => task.task === taskName && task.isChecked === true);
    if (taskIndex != -1) {
        taskList.splice(taskIndex, 1);
    }
};
export const modifyTask = (taskList, taskName, newDescription) => {
    //create new copy list
    const modifiedList = [...taskList];
    for (let i = 0; i < modifiedList.length; i++) {
        if (modifiedList[i].task === taskName && modifiedList[i].isChecked === true)
            modifiedList[i].task = newDescription;
    }
    return modifiedList;
};
