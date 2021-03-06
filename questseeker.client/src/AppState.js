import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({

  user: {},
  account: {},
  currentLocation: {},
  objectives: [],
  activeObjective: {},
  quests: [],
  status: false,
  activeQuest: {},
  answers: [],
  markers: [],
  teams: {},
  markerInfo: [],
  passingObject: {}
})
