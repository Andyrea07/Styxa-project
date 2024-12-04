import {
  getCities,
  addCities,
  updateCities,
  deleteCities
} from '../db/cities.js'

async function GetCities(req, res) {
  const { id } = req.params
  res.send(await getCities(id))
}
async function AddCities(req, res) {
  const { name, description, popularity, country_id } = req.body
  res.send(await addCities(name, description, popularity, country_id))
}

async function UpdateCities(req, res) {
  const { id } = req.params
  const { description } = req.body
  res.send(await updateCities(id, description))
}

async function DeleteCities(req, res) {
  const { id } = req.params
  res.send(await deleteCities(id))
}

export const citiesController = {
  GetCities,
  AddCities,
  UpdateCities,
  DeleteCities
}
