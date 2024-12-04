import Task from '../models/task.model.js';

export const createTask = async (values) => {
    return Task.create(values);
}

export const find = async (status, assignee, dueDate, page, limit, user) => {
    const skip = limit * (page - 1);
    const obj = {user};

    if (status) {
        obj.status = status;
    }

    if (assignee) {
        obj.assignee = assignee;
    }

    if (dueDate) {
        obj.dueDate = { $gte: new Date(dueDate) };
    }

    const findTotal = Task.countDocuments({user})
    const findTasks = Task.find(obj).sort({ createdAt: -1 }).skip(skip).limit(limit);
    
    const [totalTasks, tasks] = await Promise.all([findTotal, findTasks ])
    const totalPages = Math.ceil(totalTasks / limit);

    return {
        tasks,
        currentPage: page,
        totalTasks,
        totalPages
    }
}

export const editStatus = async (status, id) => {
    return await Task.findByIdAndUpdate(id, { status });
}

export const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
};

export const updateTask = async (id, query) => {
    return await Task.findByIdAndUpdate(id, query);
};

export const findTaskById = async (id) => {
    return await Task.findById(id);
}