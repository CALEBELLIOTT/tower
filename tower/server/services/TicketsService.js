import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"


class TicketsService {

  async getAccountTickets(id) {
    const tickets = await dbContext.Ticket.find({ accountId: id }).populate('account').populate('event')
    return tickets
  }

  async getTicketById(id) {
    const ticket = await dbContext.Ticket.findById(id)
    return ticket
  }

  async getEventTickets(id) {
    const tickets = await dbContext.Ticket.find({ eventId: id }).populate('account').populate('event')
    return tickets
  }

  async createTicket(ticketData) {
    const ticket = await dbContext.Ticket.create(ticketData)
    await towerEventsService.decreaseCapacity(ticketData.eventId)
    await ticket.populate('account')
    await ticket.populate('event')
    return ticket
  }

  async deleteTicket(ticketId, userId) {
    let targetTicket = await this.getTicketById(ticketId)
    if (targetTicket.accountId != userId) {
      throw new Forbidden("You cannot delete someone else's ticket")
    }
    await towerEventsService.increaseCapacity(targetTicket.eventId)
    await targetTicket.delete()
    return ('deleted')
  }

}

export const ticketsService = new TicketsService()