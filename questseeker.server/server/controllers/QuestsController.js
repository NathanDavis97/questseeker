import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { questsService } from '../services/QuestsService.js'
import { objectivesService } from '../services/ObjectivesService.js'
import { userQuestsService } from '../services/UserQuestsService'

export class QuestsController extends BaseController {
  constructor() {
    super('api/quests')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/objectives', this.getAllObjectives)
      .get('/:id/account', this.getUser)
      .put('/:id', this.edit)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await questsService.find(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await questsService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllObjectives(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await objectivesService.find({ questId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getUser(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await userQuestsService.getUserByQuestId({ questId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await questsService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const data = await questsService.update(req.body, req)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
