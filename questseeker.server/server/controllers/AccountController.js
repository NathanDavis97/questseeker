import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { userQuestsService } from '../services/UserQuestsService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/quests', this.getQuests)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getQuests(req, res, next) {
    try {
      const data = await userQuestsService.getQuestsByUserId(req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
