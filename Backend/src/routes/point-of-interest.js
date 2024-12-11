import { Router } from 'express'
import { pointOfInterestController } from '../controller/point-of-interest.js'

export const pointOfInterestRouter = Router()

pointOfInterestRouter.get('/', pointOfInterestController.GetPointOfInterest)

pointOfInterestRouter.get(
  '/:id',
  pointOfInterestController.GetPointOfInterestByID
)

pointOfInterestRouter.post('/', pointOfInterestController.AddPointOfInterest)

pointOfInterestRouter.put(
  '/:id',
  pointOfInterestController.UpdatePointOfInterest
)

pointOfInterestRouter.delete(
  '/:id',
  pointOfInterestController.DeletePointOfInterest
)
