// import { AppState } from '../AppState'

import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import NotificationService from '../services/NotificationService'
class HostMapService {
  async createObjective(objective, questId) {
    objective.questId = questId
    objective.location = AppState.currentLocation.position
    objective.location.address = AppState.currentLocation.address
    logger.log(objective)
    const res = await api.post('api/objectives', objective)
    NotificationService.toast('Created objective', 'success')
    logger.log(res.data)
  }
}

export const hostMapService = new HostMapService()
