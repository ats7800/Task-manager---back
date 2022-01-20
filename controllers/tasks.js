const Task = require("../models/taskDB");
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json({ tasks });
  } catch (error) {
    res.json({ success: false, msg: error });
  }
};
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: error.errors.title.message });
  }
};
const getTask = async (req, res) => {
  console.log(req.params);
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task)
      return res.status(404).json({ msg: `no task with id ${taskID}` });
    res.json(task);
  } catch (error) {
    res.json({ success: false, msg: error });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task)
      return res.status(404).json({ msg: `no task with id ${taskID}` });
    res.json({ success: true, msg: task });
  } catch (error) {
    res.json({ success: false, msg: error });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const data = req.body;
    const task = await Task.findOneAndUpdate({ _id: taskID }, data, {
      new: true,
      runValidators: true,
    });
    if (!task)
      return res.status(404).json({ msg: `no task with id ${taskID}` });
    res.json({ success: true, msg: task });
  } catch (error) {
    res.json(error);
  }
};
module.exports = { getAllTasks, createTask, getTask, deleteTask, updateTask };
