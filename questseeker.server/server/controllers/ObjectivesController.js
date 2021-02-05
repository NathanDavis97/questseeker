import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { objectivesService } from '../services/ObjectivesService.js'
import { answersService } from '../services/AnswersService.js'

export class ObjectivesController extends BaseController {
  constructor() {
    super('api/objectives')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/answers', this.getAllAnswers)
      .put('/:id', this.edit)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await objectivesService.find(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await objectivesService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllAnswers(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await answersService.find({ objectivesId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await objectivesService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const data = await objectivesService.update(req.body, req)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await objectivesService.delete(req)
      res.send('delorted')
    } catch (error) {
      next(error)
    }
  }
}
