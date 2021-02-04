import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ObjectivesService {
  async find(query = {}) {
    const objectives = await dbContext.Objectives.find(query).populate('creator')
    return objectives
  }

  async findById(id) {
    const objective = await dbContext.Objectives.findById(id).populate('creator')
    if (!objective) {
      throw new BadRequest('invalid Id')
    }
    return objective
  }

  async create(data) {
    return await dbContext.Objectives.create(data)
  }

  async update(update, req) {
    return await dbContext.Objectives.findOneAndUpdate({ _id: update.id, creatorId: req.userInfo.id }, update, { new: true }).populate('creator')
  }
}
export const objectivesService = new ObjectivesService()
