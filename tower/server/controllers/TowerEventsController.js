import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { towerEventsService } from "../services/TowerEventsService"
import { ticketsService } from "../services/TicketsService"
import { commentsService } from "../services/CommentsService"


export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tickets', this.getTicketsByEvent)
      .get('/:id/comments', this.getCommentsByEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
  }

  async getAll(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAll()
      res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getById(req.params.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      let towerEvent = await towerEventsService.createEvent(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      let updated = await towerEventsService.editEvent(req.body, req.params.id)
      res.send(updated)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const response = await towerEventsService.cancelEvent(req.params.id, req.userInfo.id)
      res.send(response)
    } catch (error) {
      next(error)
    }
  }



  async getTicketsByEvent(req, res, next) {
    try {
      const tickets = await ticketsService.getEventTickets(req.params.id)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEvent(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByEvent(req.params.id)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
}