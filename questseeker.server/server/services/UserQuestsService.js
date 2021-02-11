import { dbContext } from '../db/DbContext'

class UserQuestsService {
  async getQuestsByUserId(id) {
    const results = await dbContext.UserQuests.find({ accountId: id }).populate('quest', 'creator')
    return results
  }

  async getUserByQuestId(query) {
    const results = await dbContext.UserQuests.find(query).populate('account', 'creator')
    return results
  }

  async create(questId) {
    return await dbContext.UserQuests.create(questId)
  }
}
export const userQuestsService = new UserQuestsService()
