import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate-controller'
import { profile } from './profile'
import { register } from './register-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
