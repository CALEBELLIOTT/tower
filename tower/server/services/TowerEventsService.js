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
    if (originalEvent.isCanceled == true) {
      throw new BadRequest('this event has been cancelled')
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

  async cancelEvent(eventId, userId) {
    let target = await this.getById(eventId)
    if (target.creatorId != userId) {
      throw new BadRequest('You cannot cancel an event that is not yours')
    }
    target.isCanceled = target.isCanceled ? false : true
    await target.save()
    return ("event cancelled")
  }

}

export const towerEventsService = new TowerEventsService()