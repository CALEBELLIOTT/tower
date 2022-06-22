import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class TowerEventsService {

  async getAll() {
    const towerEvents = await dbContext.TowerEvent.find()
    return towerEvents
  }

  async getById(id) {
    const towerEvent = await dbContext.TowerEvent.findById(id)
    return towerEvent
  }

  async createEvent(body) {
    const towerEvent = await dbContext.TowerEvent.create(body)
    return towerEvent
  }

  async editEvent(body, id) {
    const originalEvent = await this.getById(id)
    if (originalEvent.creatorId.toString() !== body.creatorId) {
      throw new BadRequest("you cannot edit another person's event")
    }
    originalEvent.name = body.name || originalEvent.name
    originalEvent.description = body.description || originalEvent.description
    originalEvent.coverImg = body.coverImg || originalEvent.coverImg
    originalEvent.location = body.location || originalEvent.location
    originalEvent.startDate = body.startDate || originalEvent.startDate
    originalEvent.type = body.type || originalEvent.type
    const updated = await originalEvent.save()
    return updated
  }

}

export const towerEventsService = new TowerEventsService()