import {
  getCountry,
  getCountryByID,
  addCountry,
  updateCountry,
  deleteCountry
} from '../db/country.js'

async function GetCountry(req, res) {
  res.send(await getCountry())
}

async function GetCountryByID(req, res) {
  console.log('GET /country')
  const { id } = req.params
  res.send(await getCountryByID(id))
}

async function AddCountry(req, res) {
  const { name, description, latitude, longitude } = req.body
  res.send(await addCountry(name, description, latitude, longitude))
}

async function UpdateCountry(req, res) {
  const { id } = req.params
  const { description } = req.body
  res.send(await updateCountry(id, description))
}

async function DeleteCountry(req, res) {
  const { id } = req.params
  res.send(await deleteCountry(id))
}

export const countryController = {
  GetCountry,
  GetCountryByID,
  AddCountry,
  UpdateCountry,
  DeleteCountry
}
