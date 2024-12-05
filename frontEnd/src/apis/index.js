import axios from 'axios';
import Success from '../helpers/Success';
import Failed from '../helpers/Failed';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/v1',
    withCredentials: true
});

export const getTasksApi = async (status) => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const res = await api.get(`/tasks?status=${status}`, { headers })
        console.log(res, "asdgf",);
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }
}

export const getCompletedTasksApi = async (id) => {
    try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await api.get(`/task/${id}?status=completed`,{headers});
        console.log(res, "asdgf",);
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }
}

export const postTaskApi = async (values, flag) => {
  try {
    // Basic validation for title
    if (!values.title.trim()) return Failed("Enter a task");

    // Validate dueDate field
    if (!values.dueDate) return Failed("Please provide a due date");
    const taskDate = new Date(values.dueDate);
    const currentDate = new Date();

    // Check if dueDate is in the past
    if (taskDate < currentDate)
      return Failed("Enter a valid time (future date)");

    // Check for duplicate tasks
    if (flag) return Failed("Item already exists");

    // Fetch access token
    const token = localStorage.getItem("accessToken");
    if (!token) return Failed("Authentication failed. Please log in again.");

    // Make API request
    const headers = { Authorization: `Bearer ${token}` };
    const res = await api.post("tasks", values, { headers });

    // Success notification
    Success(res.data.message);
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    Failed(message);
  }
};


export const editTaskApi = async (values,flag) => {
  try {
    // Basic validation for title
    if (!values.title.trim()) return Failed("Enter a task");

    // Validate dueDate field
    if (!values.dueDate) return Failed("Please provide a due date");
    const taskDate = new Date(values.dueDate);
    const currentDate = new Date();

    // Check if dueDate is in the past
    if (taskDate < currentDate)
      return Failed("Enter a valid time (future date)");

    // Check for duplicate tasks
    if (flag) return Failed("Item already exists");

    // Fetch access token
    const token = localStorage.getItem("accessToken");
    if (!token) return Failed("Authentication failed. Please log in again.");

    // Make API request
    const headers = { Authorization: `Bearer ${token}` };
    const res = await api.put(`tasks/${values._id}`, values, { headers });

    // Success notification
    Success(res.data.message);
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    Failed(message);
  }
}

export const deleteTaskApi = async (id) => {
    try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await api.delete("tasks/"+id,{headers});
        console.log(res, "sssssss");
        Success(res.data.message);
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }
}

export const deleteCompletedTaskApi = async (id) => {
    try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await api.delete("tasks/"+id,{headers});
        console.log(res, "sssssss");
        Success(res.data.message);
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }
}

export const updateTaskApi = async (id, completedOn) => {
    try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        console.log(token);
    const res = await api.patch(`tasks/${id}`, { id, completedOn },{headers});
    console.log(res, "sssssss");
    Success(res.data.message);
    return res.data;
  } catch (error) {
    console.log(error);
    Failed(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};

export const getTaskStatsApi = async (id) => {
    try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
    const res = await api.get("stats/" + id,{headers});
    console.log(res, "kkkk");
    Success(res.data?.message);
    return res.data;
  } catch (error) {
    console.log(error);
    Failed(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};
