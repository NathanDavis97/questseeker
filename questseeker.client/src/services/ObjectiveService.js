import { AppState } from '../AppState'
import { api } from './AxiosService'

class ObjectiveService {
  async getAllObjectives(id) {
    try {
      const res = await api.get('api/quests/' + id + '/objectives')
      AppState.objectives = res.data
    } catch (error) {

    }
  }
}
export const objectiveService = new ObjectiveService()
