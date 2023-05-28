import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }) // vai validar se o usuário esta autenticado, mas não vai olhar a informação que esta no cabeçalho da aplicação, no Authorization Bearer token

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
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
}
