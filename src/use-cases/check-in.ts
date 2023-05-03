import { ICheckInsRepository } from '@/repositories/ICheck-ins-repository'
import { CheckIn } from '@prisma/client'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_Id: gymId,
      user_Id: userId,
    })

    return {
      checkIn,
    }
  }
}
