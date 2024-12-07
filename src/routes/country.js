import { Router } from 'express'
import { countryController } from '../controller/country.js'

export const countryRouter = Router()

countryRouter.get('/', countryController.GetCountry)

countryRouter.get('/:id', countryController.GetCountryByID)

countryRouter.post('/', countryController.AddCountry)

countryRouter.put('/:id', countryController.UpdateCountry)

countryRouter.delete('/:id', countryController.DeleteCountry)
