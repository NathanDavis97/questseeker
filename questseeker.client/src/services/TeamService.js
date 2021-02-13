import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
class TeamService {
  async getAllMembers(id) {
    try {
      const res = await api.get('api/quests/' + id + '/account')
      AppState.teams = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getAnswers(thisUser, objectId) {
    try {
      const res = await api.get('api/answers/' + thisUser)
      const filt = res.data.filter(ob => ob.objectiveId === objectId)
      logger.log(res.data)
      AppState.answers = res.data
      return filt
    } catch (error) {
      logger.error(error)
    }
  }

  async gradeCorrect(id, thisUser, objectId) {
    const update = { isCorrect: true }
    const res = await api.put('api/answers/' + id, update)
    logger.log(res, 'hello from grading')
    const currentAnswer = await this.getAnswers(thisUser, objectId)
    return currentAnswer
  }

 gradeIncorrect(id, thisUser, objectId) {
    const update = { isCorrect: false }
    const res = await api.put('api/answers/' + id, update)
    logger.log(res, 'hello from grading')
    const currentAnswer2 = await this.getAnswers(thisUser, objectId)
    return currentAnswer2
  }
}

export const teamService = new TeamService()
