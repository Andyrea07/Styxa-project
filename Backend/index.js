import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createCountry } from './src/db/country.js'
import { createCities } from './src/db/cities.js'
import { createPointOfInterest } from './src/db/point-of-interest.js'
import { createUsers } from './src/db/users.js'
import { countryRouter } from './src/routes/country.js'
import { citiesRouter } from './src/routes/cities.js'
import { pointOfInterestRouter } from './src/routes/point-of-interest.js'
import { usersRouter } from './src/routes/users.js'
import { authenticateToken } from './src/db/jwt.js'

const app = express()
const router = express.Router()

const port = 3002

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.use('/country', countryRouter)
app.use('/cities', citiesRouter)
app.use('/pointofinterest', pointOfInterestRouter)
app.use('/users', usersRouter)

router.get('/protected', authenticateToken, (req, res) => {
  res.send({ message: 'Welcome to the protected route!', user: req.user })
})
export default router

app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen`)
  createCountry()
  createCities()
  createPointOfInterest()
  createUsers()
})
