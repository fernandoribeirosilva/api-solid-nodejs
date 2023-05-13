import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchCaseInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchCaseInsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchCaseInsHistoryUseCase(checkInsRepository)
  })

  it('Should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      gym_Id: `gym-01`,
      user_Id: `user-01`,
    })

    await checkInsRepository.create({
      gym_Id: `gym-02`,
      user_Id: `user-01`,
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: 'gym-01' }),
      expect.objectContaining({ gym_Id: 'gym-02' }),
    ])
  })

  it('Should be able to fetch paginated check-in history', async () => {
    for (let i = 0; i <= 22; i++) {
      await checkInsRepository.create({
        gym_Id: `gym-${i}`,
        user_Id: `user-01`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: 'gym-21' }),
      expect.objectContaining({ gym_Id: 'gym-22' }),
    ])
  })
})
