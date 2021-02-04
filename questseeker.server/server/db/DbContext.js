import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import QuestSchema from '../models/Quest'
import ObjectiveSchema from '../models/Objective'
import AnswerSchema from '../models/Answer'
import UserQuestSchema from '../models/UserQuest'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Quests = mongoose.model('Quest', QuestSchema);
  Objectives = mongoose.model('Objective', ObjectiveSchema);
  Answers = mongoose.model('Answer', AnswerSchema);
  UserQuests = mongoose.model('UserQuest', UserQuestSchema);
}

export const dbContext = new DbContext()
