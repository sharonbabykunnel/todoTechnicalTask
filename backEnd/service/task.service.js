import * as Task from '../repository/task.repository.js';
import { NotFoundError } from '../utils/errorHandler.js';

export const getTasks = async (status = '', assignee = '', dueDate, page = 1, limit = 10, user) => {
    const tasks = await Task.find(status, assignee, dueDate, page, limit, user);

    return tasks;
}

export const createTask = async (values, user) => {
    const obj = {
        ...values,
        user
    }
    const task = await Task.createTask(obj);
    return task;
}

export const editstatus = async (id) => {
    const task = await Task.editStatus(id);
    if (!task) {
        throw new NotFoundError('Task not founded');
    }
    return task;
}

export const deleteTask = async (id) => {
    const task = await Task.deleteTask(id);
    return task;
}

export const updateTask = async (id) => {
    const task = await Task.updateTask(id);
    return task;
}