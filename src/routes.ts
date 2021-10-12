import { Router } from 'express'
import { getUsers } from './controller/UserController'

export const routes = Router()

routes.get('/users', getUsers)