// import { AppState } from '../AppState'

import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class HostMapService {
  async createObjective(objective, questId) {
    objective.questId = questId
    objective.location = AppState.currentLocation
    logger.log(objective)
    const res = await api.post('api/objectives', objective)
    logger.log(res.data)
  }
}

export const hostMapService = new HostMapService()
