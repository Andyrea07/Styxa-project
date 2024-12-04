import {
  addPointOfInterest,
  getPointOfInterest,
  updatePointOfInterest,
  deletePointOfInterest
} from '../db/point-of-interest.js'

async function GetPointOfInterest(req, res) {
  res.send(await getPointOfInterest())
}

async function AddPointOfInterest(req, res) {
  const { name, description, city_id, google_maps_URL, images } = req.body
  res.send(
    await addPointOfInterest(
      name,
      description,
      city_id,
      google_maps_URL,
      images
    )
  )
}

async function UpdatePointOfInterest(req, res) {
  const { id } = req.params
  const { description } = req.body
  res.send(await updatePointOfInterest(id, description))
}

async function DeletePointOfInterest(req, res) {
  const { id } = req.params
  res.send(await deletePointOfInterest(id))
}

export const pointOfInterestController = {
  GetPointOfInterest,
  AddPointOfInterest,
  UpdatePointOfInterest,
  DeletePointOfInterest
}
