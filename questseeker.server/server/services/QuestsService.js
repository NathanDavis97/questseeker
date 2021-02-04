import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class QuestsService {
  async find(query = {}) {
    const quests = await dbContext.Quests.find(query).populate('creator')
    return quests
  }

  async findById(id) {
    const quest = await dbContext.Quests.findById(id).populate('creator')
    if (!quest) {
      throw new BadRequest('invalid Id')
    }
    return quest
  }

  async create(data) {
    data.hostId = data.creatorId
    return await dbContext.Quests.create(data)
  }

  async update(update, req) {
    return await dbContext.Quests.findOneAndUpdate({ _id: update.id, creatorId: req.userInfo.id }, update, { new: true }).populate('creator')
  }
}
export const questsService = new QuestsService()
