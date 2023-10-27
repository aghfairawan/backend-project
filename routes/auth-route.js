const { Router } = require('express')
const { register, login, logout } = require('../service/auth-service.js')
const { body } = require('express-validator')

const authRouter = Router()

authRouter.post('/register', body('username').trim(), register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

module.exports = authRouter