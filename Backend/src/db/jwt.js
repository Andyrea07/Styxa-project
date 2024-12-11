import { verifyToken } from '../utils/jwt.js'

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(403).send({ message: 'No token provided' })

  const decoded = verifyToken(token)
  if (!decoded) return res.status(401).send({ message: 'Unauthorized' })

  req.user = decoded // Attach user info to the request
  next()
}
