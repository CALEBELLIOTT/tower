import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketsService } from "../services/TicketsService"

export class TicketsController extends BaseController {
  constructor() {
    super('/api/tickets')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
  }

  async getAll(req, res, next) {
    try {
      const tickets = await ticketsService.getAll()
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async createTicket(req, res, next) {
    req.body.accountId = req.userInfo.id
    try {
      const ticket = await ticketsService.createTicket(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }


}