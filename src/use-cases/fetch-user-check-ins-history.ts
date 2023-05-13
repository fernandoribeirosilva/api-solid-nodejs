import { ICheckInsRepository } from '@/repositories/ICheck-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchCaseInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchCaseInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchCaseInsHistoryUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchCaseInsHistoryUseCaseRequest): Promise<FetchCaseInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
