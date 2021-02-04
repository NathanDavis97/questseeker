import { AppState } from '../AppState'
import router from '../router'
import { codeGenerator } from '../utils/CodeGenerator'
import { api } from './AxiosService'

class QuestService {
  async createQuest(newQuest) {
    newQuest.accessCode = codeGenerator(5)
    const res = await api.post('api/quests/', newQuest)
    AppState.quests.push(res.data)
    AppState.activeQuest = res.data
    router.push({ name: 'AddLocationPage', params: { questId: res.data.id } })
  }

  async joinQuest(inputCode) {
    // Make onMounted to get all quests. To filter next line
    // TODO filter through the quests array and find where the access codes from both quests and submitted access code match.
    // Make relationship between individual and quest. (Pushing user and quest into many to many {userquest})
    // Set as active quest for user in AppState.
    // Router Push user to map page.
    // SUPPLY THE BACK END 1-Quest Id 2-Status. (Back end will pull user id off of account)
  }
}
export const questService = new QuestService()
