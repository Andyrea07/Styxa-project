import client from './db.js'

export function createCities() {
  client.query(`
          CREATE TABLE IF NOT EXISTS Cities (
          id INT GENERATED ALWAYS AS IDENTITY,
          name VARCHAR(100) NOT NULL,
          description VARCHAR(500),
          population INT,
          country_id INT,

          PRIMARY KEY(id),

          CONSTRAINT fk_countryid
      FOREIGN KEY (country_id)
      REFERENCES Country (id)
          )`)
}

export async function addCities(name, description, population, country_id) {
  await client.query(`
          INSERT INTO Cities (id, name, description, population, country_id)
          VALUES (DEFAULT, '${name}', '${description}', ${population}, ${country_id})
          `)
}
export async function getCities() {
  const cities = await client.query(`
        SELECT * FROM Cities
        `)
  return cities.rows
}
export async function getCitiesByID() {
  const cities = await client.query(`
        SELECT * FROM Cities
        `)
  return cities.rows
}

export async function updateCities(id, description) {
  const cities = await client.query(`
        UPDATE Cities
        SET description = '${description}'
        WHERE id = ${id}
        `)
  return cities.rows
}

export async function deleteCities(id) {
  const cities = await client.query(`
        DELETE FROM Cities
        WHERE id = ${id}
        `)
  return cities.rows
}
