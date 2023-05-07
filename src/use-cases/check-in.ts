import { ICheckInsRepository } from '@/repositories/ICheck-ins-repository'
import { IGymsRepository } from '@/repositories/IGyms-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) throw new ResourceNotFoundError()

    // calculate distance between user and gym

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) throw new Error()

    const checkIn = await this.checkInsRepository.create({
      gym_Id: gymId,
      user_Id: userId,
    })

    return {
      checkIn,
    }
  }
}
