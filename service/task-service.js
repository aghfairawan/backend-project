const { dateTime } = require('express-openapi-validator/dist/framework/base.serdes');
const { ObjectId, Timestamp } = require('mongodb');

const getAllTask = async (req, res) => {
  const decodedToken = req.decodedToken; 

  try {
    if (decodedToken.role === 'admin') {
      const task = await req.db.collection('task').find().toArray();
      res.status(200).json({
        message: 'All tasks successfully retrieved',
        data: task
      });
    } else if (decodedToken.role === 'user') {
      const userTasks = await req.db.collection('task').find({ owner: decodedToken.username }).toArray();
      res.status(200).json({
        message: 'User tasks successfully retrieved',
        data: userTasks
      });
    } else {
      res.status(403).json({
        message: 'Forbidden: Access to tasks is not allowed',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  const decodedToken = req.decodedToken; 

  try {
    const task = await req.db.collection('task').findOne({ _id: new ObjectId(taskId) });

    if (!task) {
      res.status(404).json({
        message: 'Task not found',
      });
    } else if (decodedToken.role === 'admin' || task.owner === decodedToken.username) {
      
      res.status(200).json({
        message: 'Task successfully retrieved',
        data: task,
      });
    } else {
      res.status(403).json({
        message: 'Forbidden: Access to this task is not allowed',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const createTask = async (req, res) => {
  const decodedToken = req.decodedToken; 
  const { title, priority, isDone } = req.body;

  
  if (decodedToken.username) {
    const createdAtTimestamp = Date.now();
    const createdAt = new Date(createdAtTimestamp);

    const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')} ${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}:${createdAt.getSeconds().toString().padStart(2, '0')}`;
    const owner = decodedToken.username;

    try {
      const newTask = await req.db.collection('task').insertOne({ title, priority, createdAt: formattedDate, owner, isDone });

      res.status(200).json({
        message: 'Task successfully created',
        data: newTask
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({
      message: 'Forbidden: Access to create this task is not allowed',
    });
  }
}


const deleteTaskById = async (req, res) => {
  const decodedToken = req.decodedToken; 
  const taskId = req.params.id;

  try {
    const task = await req.db.collection('task').findOne({ _id: new ObjectId(taskId) });

    if (!task) {
      res.status(404).json({
        message: 'Task not found',
      });
    } else if (decodedToken.role === 'admin' || task.owner === decodedToken.username) {
      
      const deletedTask = await req.db.collection('task').findOneAndDelete({ _id: new ObjectId(taskId) });

      if (deletedTask) {
        res.status(200).json({
          message: 'Task successfully deleted',
          data: deletedTask,
        });
      } else {
        res.status(404).json({
          message: 'Task not found',
        });
      }
    } else {
      res.status(403).json({
        message: 'Forbidden: Access to delete this task is not allowed',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateTaskById = async (req, res) => {
  const decodedToken = req.decodedToken; 
  const taskId = req.params.id;
  const { title, priority, createdAt, owner, isDone } = req.body;

  if (decodedToken.role) {
    const updateFields = {};

    if (title) {
      updateFields.title = title;
    }
    if (priority) {
      updateFields.priority = priority;
    }
    if (createdAt) {
      updateFields.createdAt = createdAt;
    }
    if (owner) {
      updateFields.owner = owner;
    }
    if (isDone) {
      updateFields.isDone = isDone;
    }

    try {
      const updatedTask = await req.db.collection('task').findOneAndUpdate(
        { _id: new ObjectId(taskId) },
        { $set: updateFields },
        { returnOriginal: false }
      );

      if (updatedTask) {
        res.status(200).json({
          message: 'Task successfully updated',
          data: updatedTask.value,
        });
      } else {
        res.status(404).json({
          message: 'Task not found',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Failed to update task: An error occurred',
      });
    }
  } else {
    res.status(403).json({
      message: 'Forbidden: Access to update this task is not allowed',
    });
  }
};





module.exports = {
  getAllTask,
  createTask,
  deleteTaskById,
  updateTaskById,
  getTaskById
}