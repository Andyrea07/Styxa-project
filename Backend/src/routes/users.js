import { Router } from 'express'
import { usersController } from '../controller/users.js'

export const usersRouter = Router()

usersRouter.get('/', usersController.GetUsers)

usersRouter.post('/', usersController.AddUsers)

usersRouter.put('/:id', usersController.UpdateUsers)

usersRouter.delete('/:id', usersController.DeleteUsers)
