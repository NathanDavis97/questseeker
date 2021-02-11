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

  async getAnswers(accountId, questId) {
    try {
      const res = await api.get('api/answers/' + accountId).filter(questId)
      AppState.answers = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const teamService = new TeamService()
