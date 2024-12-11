import { getUsers, updateUsers, deleteUsers, addUsers } from '../db/users.js'
import { addRule } from '../validators/users.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt.js'

async function GetUsers(req, res) {
  res.send(await getUsers())
}

async function AddUsers(req, res) {
  try {
    const { Firstname, Lastname, Username, Password, confirmPassword } =
      await addRule.validateAsync(req.body)
    const secretPassword = await bcrypt.hash(Password, 10)

    const same = await bcrypt.compare(confirmPassword, secretPassword)
    if (!same) {
      res.status(400).send('Not the same password')
      return
    }
    await addUsers(Firstname, Lastname, Username, secretPassword)
    res.send('Successful login', token)

    const token = generateToken({ Username })
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteUsers(req, res) {
  const { id } = req.params
  res.send(await deleteUsers(id))
}

async function UpdateUsers(req, res) {
  const { id } = req.params
  const { Username, Password } = req.body
  res.send(await updateUsers(id, Username, Password))
}

export const usersController = {
  GetUsers,
  AddUsers,
  UpdateUsers,
  DeleteUsers
}
