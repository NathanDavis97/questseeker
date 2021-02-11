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
}
export const objectiveService = new ObjectiveService()
