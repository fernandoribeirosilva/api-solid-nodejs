import { FastifyInstance } from 'fastify'
import { authenticate } from './controller/authenticate-controller'
import { register } from './controller/register-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)
}
