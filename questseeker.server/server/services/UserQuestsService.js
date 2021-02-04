import { dbContext } from '../db/DbContext'

class UserQuestsService {
  async getQuestsByUserId(accountId) {
    const results = await dbContext.UserQuests.find({ userId: accountId }).populate('quest')
    return results
  }

  async getUserByQuestId(query) {
    const results = await dbContext.UserQuests.find(query).populate('quest')
    return results
  }

  async create(questId) {
    return await dbContext.UserQuests.create(questId)
  }
}
export const userQuestsService = new UserQuestsService()
