import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d', // 7 days
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/', // quais rotas vai ter acesso a este cookie, do nosso backEnd vai ter acesso ao cookie. a "/" que dizer que todo o backEnd vai ter acesso ao cookie
        secure: true, // vai ser encriptado pelo método HTTPs. Quando colocamos secure: true, o frontEnd não vai conseguir ler o valor de cookie
        sameSite: true, // vai ser somente acessível somente dentro do mesmo domínio (mesmo site)
        httpOnly: true, // que dizer que este token só vai ser acessado por dentro do backEnd
      })
      .code(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.code(400).send({ message: error.message })
    }

    throw error
  }
}
