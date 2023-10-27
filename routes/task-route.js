const { Router } = require('express')
const { getAllTask, createTask, deleteTaskById, updateTaskById, getTaskById } = require('../service/task-service.js')
const authorizationMiddleware =  require('../midleware/authorization-midleware.js')

const taskRouter = Router()

taskRouter.get('/',authorizationMiddleware, getAllTask)
taskRouter.get('/:id',authorizationMiddleware, getTaskById)
taskRouter.post('/', authorizationMiddleware, createTask)
taskRouter.delete('/:id', authorizationMiddleware, deleteTaskById)
taskRouter.put('/:id',authorizationMiddleware, updateTaskById)

module.exports = taskRouter