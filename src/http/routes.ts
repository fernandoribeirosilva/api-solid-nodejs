import { FastifyInstance } from 'fastify'
import { authenticate } from './controller/authenticate-controller'
import { profile } from './controller/profile'
import { register } from './controller/register-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.get('/me', profile)
}
