import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { userQuestsService } from '../services/UserQuestsService.js'

export class UserQuestsController extends BaseController {
  constructor() {
    super('api/userquests')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      req.body.userId = req.userInfo.id
      const data = await userQuestsService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
