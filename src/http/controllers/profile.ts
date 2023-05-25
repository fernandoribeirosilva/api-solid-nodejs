import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify() // vai busca dentro do meu cabeçalhos, e se este token existir la dentro ela vai validar, se este token foi realmente gerado pela moça aplicação, batendo ele com a chave secreta. Sé o token não existir ele já vai error é não vai escultar nem um código abaixo

  const geUserProfile = makeGetUserProfileUseCase()
  const { user } = await geUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.code(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
