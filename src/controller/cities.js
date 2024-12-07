import {
  getCities,
  getCitiesByID,
  addCities,
  updateCities,
  deleteCities
} from '../db/cities.js'

async function GetCitiesByID(req, res) {
  console.log('GET /cities')
  const { id } = req.params
  res.send(await getCitiesByID(id))
}

async function GetCities(req, res) {
  res.send(await getCities())
}

async function AddCities(req, res) {
  const { name, description, population, country_id } = req.body
  res.send(await addCities(name, description, population, country_id))
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
  GetCitiesByID,
  GetCities,
  AddCities,
  UpdateCities,
  DeleteCities
}
