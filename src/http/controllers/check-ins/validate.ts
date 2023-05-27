import { makeValidateCheckInsUseCase } from '@/use-cases/factories/make-validate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInsUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.code(204).send()
}
