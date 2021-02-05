import { AppState } from '../AppState'
import router from '../router'
import { codeGenerator } from '../utils/CodeGenerator'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class QuestService {
  async getQuests() {
    const res = await api.get('api/quests/')
    AppState.quest = res.data
  }

  async createQuest(newQuest) {
    newQuest.accessCode = codeGenerator(5)
    const res = await api.post('api/quests/', newQuest)
    this.getQuests()
    AppState.quests.push(res.data)
    AppState.activeQuest = res.data
    logger.log(res.data)
    return res.data.id
  }

  async joinQuest(inputCode) {
    // filter
    const matchingAccessCode = AppState.quests.filter(quest => quest.accessCode === inputCode.accessCode)
    const relationshipInfo = { questId: matchingAccessCode[0].id }

    // TODO test with and without await
    await api.post('api/userquests', relationshipInfo)
    AppState.activeQuest = matchingAccessCode[0]
    router.push({ name: 'MapPage', params: { questId: matchingAccessCode[0].id } })
    // ANCHOR Make onMounted to get all quests. To filter next line
    // Route will equal api/userquests
    // TODO filter through the quests array and find where the access codes from both quests and submitted access code match.
    // Make relationship between individual and quest. (Pushing user and quest into many to many {userquest})
    // Set as active quest for user in AppState.
    // Router Push user to map page.
    // SUPPLY THE BACK END 1-Quest Id 2-Status. (Back end will pull user id off of account)
  }
}
export const questService = new QuestService()
