import {
  addPointOfInterest,
  getPointOfInterest,
  getPointOfInterestByID,
  updatePointOfInterest,
  deletePointOfInterest
} from '../db/point-of-interest.js'

async function GetPointOfInterest(req, res) {
  console.log('Meghivja')
  res.send(await getPointOfInterest())
}

async function GetPointOfInterestByID(req, res) {
  const { id } = req.params
  res.send(await getPointOfInterestByID(id))
}

async function AddPointOfInterest(req, res) {
  const { name, description, city_id } = req.body
  res.send(await addPointOfInterest(name, description, city_id))
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
  GetPointOfInterestByID,
  AddPointOfInterest,
  UpdatePointOfInterest,
  DeletePointOfInterest
}
