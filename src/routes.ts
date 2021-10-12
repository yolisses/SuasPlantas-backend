import { Router } from 'express'
import { getUsers } from 'user/UserController'

export const routes = Router()

routes.get('/users', getUsers)