import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check-in history (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // vai esperar a aplicação subir
  })

  afterAll(async () => {
    await app.close() // vai aguardar a aplicação fechar
  })

  it('should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -13.2248733,
        longitude: -49.5076427,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_Id: gym.id,
          user_Id: user.id,
        },
        {
          gym_Id: gym.id,
          user_Id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_Id: gym.id,
        user_Id: user.id,
      }),
      expect.objectContaining({
        gym_Id: gym.id,
        user_Id: user.id,
      }),
    ])
  })
})
