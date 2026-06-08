// authMiddleware.js - Validates JWT tokens from Authorization headers and attaches decoded user data to req.user.
import jwt from 'jsonwebtoken'

export function protect(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'No token provided. Please sign in.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    // The token payload is created during login and contains the user's id and username.
    request.user = jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch (_error) {
    return response.status(401).json({ message: 'Invalid or expired token.' })
  }
}
