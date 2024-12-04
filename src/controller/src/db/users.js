import client from './db.js'

export function createUsers() {
  client.query(`
        CREATE TABLE IF NOT EXISTS Users (
        id INT GENERATED ALWAYS AS IDENTITY,
        Firstname VARCHAR(100),
        Lastname VARCHAR(100),
        Username VARCHAR(100),
        Password VARCHAR(100)
        )`)
}

export async function addUsers(Firstname, Lastname, Username, Password) {
  await client.query(`
            INSERT INTO Users (id, Firstname, Lastname, Username, Password)
            VALUES (default, '${Firstname}', '${Lastname}', '${Username}', '${Password}')
            `)
}

export async function getUsers() {
  const users = await client.query(`SELECT * FROM Users`)
  return users.rows
}

export async function updateUsers(id, Username, Password) {
  const users = await client.query(`
          UPDATE Users
          SET Username = '${Username}}', Password = '${Password}'
          WHERE id = ${id}
        `)
  return users.rows
}

export async function deleteUsers(id) {
  const users = await client.query(`
        DELETE FROM Users
        WHERE id = ${id}
        `)
  return users.rows
}
