import { Router } from 'express'
import { citiesController } from '../controller/cities.js'

export const citiesRouter = Router()

citiesRouter.get('/:id', citiesController.GetCities)

citiesRouter.post('/', citiesController.AddCities)

citiesRouter.put('/:id', citiesController.UpdateCities)

citiesRouter.delete('/:id', citiesController.DeleteCities)
