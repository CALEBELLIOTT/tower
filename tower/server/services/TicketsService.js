import { dbContext } from "../db/DbContext"
import { towerEventsService } from "./TowerEventsService"


class TicketsService {
  async getAccountTickets(id) {
    const tickets = await dbContext.Ticket.find({ accountId: id }).populate('account').populate('event')
    return tickets
  }

  async createTicket(ticketData) {
    const ticket = await dbContext.Ticket.create(ticketData)
    await towerEventsService.decreaseCapacity(ticketData.eventId)
    await ticket.populate('account')
    await ticket.populate('event')
    return ticket
  }

}

export const ticketsService = new TicketsService()