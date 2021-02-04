import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class AnswersService {
  async find(query = {}) {
    const answers = await dbContext.Answers.find(query).populate('creator')
    return answers
  }

  async findById(id) {
    const answer = await dbContext.Answers.findById(id).populate('creator')
    if (!answer) {
      throw new BadRequest('invalid Id')
    }
    return answer
  }

  async create(data) {
    return await dbContext.Answers.create(data)
  }

  async update(update, req) {
    return await dbContext.Answers.findOneAndUpdate({ _id: update.id, creatorId: req.userInfo.id }, update, { new: true }).populate('creator')
  }
}
export const answersService = new AnswersService()
