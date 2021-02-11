import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ObjectiveService {
  async getAllObjectives(id) {
    try {
      const res = await api.get('api/quests/' + id + '/objectives')
      AppState.objectives = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getObjective(objective) {
    const res = await api.get('api/objectives/' + objective.id)
    AppState.activeObjective = res.data
  }

  async submitAnswer(answer) {
    // TODO do a check to see if answer has already been submitted by this user.
    await api.post('api/answers', answer)
    logger.log(answer)
  }

  async getAnswers(objective) {
    // debugger
    const res = await api.get('api/objectives/' + objective.id + '/answers')
    const filt = await res.data.filter(answer => answer.creator.id === AppState.account.id)

    if (filt.length > 0) {
      AppState.status = true
    } else {
      AppState.status = false
    }
  }
}
export const objectiveService = new ObjectiveService()
