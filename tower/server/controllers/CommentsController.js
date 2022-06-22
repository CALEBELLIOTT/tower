import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService.js"
import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:id', this.deleteComment)
  }

  async createComment(req, res, next) {
    req.body.creatorId = req.userInfo.id
    try {
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const response = await commentsService.deleteComment(req.params.id, req.userInfo.id)
      res.send(response)
    } catch (error) {
      next(error)
    }
  }
}