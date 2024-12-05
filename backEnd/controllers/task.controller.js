import asyncHandler from '../middlewares/asyncHandler.js';
import * as Task from '../service/task.service.js';

export const findTasks = asyncHandler(async (req, res) => {
    const { status, assignee, dueDate, page, limit } = req.query;
    const user = req.user.uid;

    const tasks = await Task.getTasks(status, assignee, dueDate, page, limit, user);
    res.status(200).json({ success: true, message: 'Successful', tasks });
})

export const createTask = asyncHandler(async (req, res) => {
    const user = req.user.uid;
    const values = req.body;
    console.log(values)

    const task = await Task.createTask(values, user);

    res.status(200).json({ success: true, message: 'Task created', task });
})

export const editStatus = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const task = await Task.editstatus(id);
    res.status(200).json({ message: 'Task Completed', success: true, task });
});

export const updateTask = asyncHandler(async (req, res) => {
    console.log('id')
    const id = req.params.id;
    const task = await Task.updateTask(id);

    res.status(200).json({ success: true, message: 'Updated', task });
})

export const deleteTask = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const task = await Task.deleteTask(id);

    res.status(200).json({ success: true, message: 'Deleted', task });
})