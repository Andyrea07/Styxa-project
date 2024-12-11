import client from './db.js'

export function createPointOfInterest() {
  client.query(`
        CREATE TABLE IF NOT EXISTS PointOfInterest(
        id INT GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(100),
        description VARCHAR(500),
        city_id INT,

        PRIMARY KEY (id),

        CONSTRAINT fk_city_id
        FOREIGN KEY (city_id)
        REFERENCES Cities (id)
)`)
}

export async function addPointOfInterest(name, description, city_id) {
  await client.query(`
            INSERT INTO PointOfInterest (id, name, description, city_id)
            VALUES (DEFAULT, '${name}', '${description}', ${city_id})
            `)
}

export async function getPointOfInterest() {
  const pointOfInterest = await client.query(`
          SELECT * FROM PointOfInterest
          `)
  return pointOfInterest.rows
}

export async function getPointOfInterestByID() {
  const pointOfInterest = await client.query(`
          SELECT * FROM PointOfInterest
          `)
  return pointOfInterest.rows
}

export async function updatePointOfInterest(id, description) {
  const pointOfInterest = await client.query(`
          UPDATE PointOfInterest
          SET description = '${description}'
          WHERE id = ${id}
          `)
  return pointOfInterest.rows
}

export async function deletePointOfInterest(id) {
  const pointOfInterest = await client.query(`
          DELETE FROM PointOfInterest
          WHERE id = ${id}
          `)
  return pointOfInterest.rows
}
