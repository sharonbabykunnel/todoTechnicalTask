import express from "express";
import {
  createTask,
  findTasks,
  editStatus,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";
import checkAccessToken from "../middlewares/authMiddleware.js";

const route = express.Router();

route.get('/', checkAccessToken, findTasks);
route.post('/', checkAccessToken, createTask);
route.put('/:id', checkAccessToken, updateTask);
route.patch('/:id', checkAccessToken, editStatus);
route.delete('/:id', checkAccessToken, deleteTask);

export default route;