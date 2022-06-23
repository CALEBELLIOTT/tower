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
}

export const eventsService = new EventsService()