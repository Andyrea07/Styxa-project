import client from './db.js'

export function createCountry() {
  client.query(`
        CREATE TABLE IF NOT EXISTS Country (
        id INT GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(500),
        latitude REAL,
        longitude REAL,

        PRIMARY KEY (id)
        )`)
}

export async function addCountry(name, description, latitude, longitude) {
  await client.query(`
        INSERT INTO Country (id, name, description, latitude, longitude)
        VALUES (DEFAULT, '${name}', '${description}', ${latitude}, ${longitude})
        `)
}

export async function getCountry() {
  const country = await client.query(`
        SELECT * FROM Country
        `)
  return country.rows
}

export async function getCountryByID() {
  const country = await client.query(`
        SELECT * FROM Country
        `)
  return country.rows
}

export async function updateCountry(id, description) {
  const country = await client.query(`
        UPDATE Country
        SET description = '${description}'
        WHERE id = ${id}
        `)
  return country.rows
}

export async function deleteCountry(id) {
  const country = await client.query(`
        DELETE FROM Country
        WHERE id = ${id}
        `)
  return country.rows
}
