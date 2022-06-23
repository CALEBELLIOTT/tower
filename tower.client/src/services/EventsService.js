import { AppState } from "../AppState";
import { api } from "./AxiosService"


class EventsService {
  async getEvents() {
    const res = await api.get('api/events')
    AppState.events = res.data
    console.log(AppState.events);
  }
}

export const eventsService = new EventsService()