import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { answersService } from '../services/AnswersService.js'

export class AnswersController extends BaseController {
  constructor() {
    super('api/answers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getAllAnswersByUser)
      .put('/:id', this.edit)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await answersService.find(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllAnswersByUser(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await answersService.find({ creatorId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await answersService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const data = await answersService.update(req.body, req)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
