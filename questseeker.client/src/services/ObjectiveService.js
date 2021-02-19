import { AppState } from '../AppState'
import router from '../router'
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

  async submitAnswer(answer, account) {
    // TODO do a check to see if answer has already been submitted by this user.
    // logger.log(account, 'this should be account obj')
    const res = await api.get('api/objectives/' + answer.objectiveId + '/answers')

    const array = res.data
    // debugger
    const filt = array.filter(answer => answer.creatorId === account._id)
    // logger.log('this should be the account id we check', AppState.account)
    if (filt.length < 1) {
      await api.post('api/answers', answer)
      // AppState.status = true
      router.push({ name: 'MapPage', params: answer.questId })
      logger.log(answer)
    } else {
      window.alert('You have already submitted an answer')
      router.push({ name: 'MapPage', params: answer.questId })
    }
  }

  async getAnswers(objective) {
    // debugger
    const res = await api.get('api/objectives/' + objective.id + '/answers')

    const answers = res.data
    const filt = answers.filter(answer => answer.creatorId === AppState.account)
    logger.log('this should be the account id we check', AppState.account)
    if (filt.length > 0) {
      AppState.status = true
    } else {
      AppState.status = false
    }
  }

  async getMarkers(questId) {
    // debugger
    const res = await api.get('api/quests/' + questId + '/objectives')
    logger.log('this is the objectives/markers', res.data)
    AppState.markers = res.data
    this.formatMarkerInfo()
  }

  formatMarkerInfo() {
    AppState.markers.forEach(marker => {
      // debugger
      const passingObject = {}
      passingObject.lat = marker.location.lat
      passingObject.lng = marker.location.lng
      passingObject.address = marker.location.address
      passingObject.title = marker.title
      passingObject.objectiveId = marker.id
      AppState.markerInfo.push(passingObject)
      // state.passingObject = {}

      // TODO get title later???
      // state.markerInfo.push(marker.title)
      logger.log('this is the formatted', AppState.markerInfo)
    })
    return AppState.markerInfo
  }
}
export const objectiveService = new ObjectiveService()
