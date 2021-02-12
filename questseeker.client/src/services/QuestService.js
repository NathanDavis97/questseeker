import { AppState } from '../AppState'
import { codeGenerator } from '../utils/CodeGenerator'
import router from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class QuestService {
  async getQuests() {
    const res = await api.get('api/quests/')
    AppState.quests = res.data
  }

  async createQuest(newQuest) {
    newQuest.accessCode = codeGenerator(5)
    const res = await api.post('api/quests/', newQuest)
    this.getQuests()
    AppState.quests.push(res.data)
    AppState.activeQuest = res.data
    logger.log(res.data, AppState.activeQuest, 'setting active quest')
    return res.data.id
  }

  async questJoinable(questId, update) {
    const questData = { isJoinable: update }
    const res = await api.put('api/quests/' + questId, questData)
    logger.log(res.data, questData)
  }

  async questActive(questId, update) {
    const questData = { isActive: update }
    const res = await api.put('api/quests/' + questId, questData)
    logger.log(res.data, questData)
  }

  async joinQuest(inputCode) {
    // filter
    await this.getQuests()
    const matchingAccessCode = AppState.quests.filter(quest => quest.accessCode === inputCode.accessCode)
    logger.log(matchingAccessCode)
    if (matchingAccessCode[0].isJoinable === true) {
      // logger.log(quest)
      const relationshipInfo = { questId: matchingAccessCode[0].id, accountId: inputCode.accountId }
      logger.log(matchingAccessCode)

      // TODO test with and without await
      await api.post('api/userquests', relationshipInfo)

      const res = await api.get('api/quests/' + matchingAccessCode[0].id + '/objectives')
      AppState.markers = res.data

      logger.log('quest to pull obj', res.data)
      AppState.activeQuest = matchingAccessCode[0]
      router.push({ name: 'MapPage', params: { questid: matchingAccessCode[0].id } })
      // ANCHOR Make onMounted to get all quests. To filter next line
      // Route will equal api/userquests
      // TODO filter through the quests array and find where the access codes from both quests and submitted access code match.
      // Make relationship between individual and quest. (Pushing user and quest into many to many {userquest})
      // Set as active quest for user in AppState.
      // Router Push user to map page.
      // SUPPLY THE BACK END 1-Quest Id 2-Status. (Back end will pull user id off of account)
      this.formatMarkerInfo()
    } else { return window.alert('This Quest is not Joinable') }
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
export const questService = new QuestService()
