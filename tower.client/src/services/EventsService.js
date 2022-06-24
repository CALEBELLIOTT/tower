import { AppState } from "../AppState";
import { api } from "./AxiosService"


class EventsService {
  async getEvents() {
    const res = await api.get('api/events')
    AppState.events = res.data
    console.log(AppState.events);
  }

  async getEventById(id) {
    const res = await api.get(`api/events/${id}`)
    console.log(res.data);
    AppState.activeEvent = res.data
  }

  async getEventAttendees(id) {
    const res = await api.get(`api/events/${id}/tickets`)
    console.log(res.data);
    AppState.activeEventTickets = res.data
  }

  async getEventComments(id) {
    const res = await api.get(`api/events/${id}/comments`)
    console.log(res.data);
    AppState.activeEventComments = res.data
  }

  async postComment(commentBody) {
    commentBody.creatorId = AppState.account.id
    commentBody.eventId = AppState.activeEvent.id
    const res = await api.post(`api/comments/`, commentBody)
    AppState.activeEventComments.push(res.data)
    console.log(res.data);
  }

  async attendEvent() {
    let body = {
      eventId: AppState.activeEvent.id,
      accountId: AppState.account.id
    }
    const res = await api.post('api/tickets', body)
    console.log(res.data);
    AppState.activeEventTickets.push(res.data)
    AppState.activeEvent.capacity--
  }

  async cancelAttendEvent() {
    let found = AppState.activeEventTickets.find(t => t.accountId == AppState.account.id)
    const res = await api.delete(`api/tickets/${found.id}`)
    AppState.activeEventTickets = AppState.activeEventTickets.filter(t => t.id != found.id)
    AppState.activeEvent.capacity++
    console.log(res.data);
  }

  async createEvent(body) {
    const res = await api.post('api/events', body)
    AppState.events.push(res.data)
    console.log(res.data);
  }

  async deleteEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    console.log(res.data);
    AppState.activeEvent = res.data
    console.log(AppState.activeEvent);
  }

  async getEventsByAccount() {
    const res = await api.get('account/tickets')
    AppState.accountEvents = res.data
    console.log(res.data);
  }
}

export const eventsService = new EventsService()