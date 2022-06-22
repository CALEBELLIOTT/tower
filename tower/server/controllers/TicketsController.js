import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TicketsController extends BaseController {
  constructor() {
    super('/api/tickets')
    this.router
      .get('',)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
  }

  async createTicket() {

  }


}