import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketsService } from "../services/TicketsService"

export class TicketsController extends BaseController {
  constructor() {
    super('/api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:id', this.deleteTicket)
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

  async deleteTicket(req, res, next) {
    try {
      const ticket = await ticketsService.deleteTicket(req.params.id, req.userInfo.id)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }


}