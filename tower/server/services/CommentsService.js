import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class CommentsService {


  async findById(id) {
    const comment = await dbContext.Comment.findById(id)
    return comment
  }
  async createComment(commentData) {
    const comment = await dbContext.Comment.create(commentData)
    await comment.populate('creator')
    return comment
  }




  async getCommentsByEvent(eventId) {
    const comments = await dbContext.Comment.find({ eventId }).populate('creator')
    return comments
  }

  async deleteComment(commentId, userId) {
    const targetComment = await this.findById(commentId)
    if (targetComment.creatorId != userId) {
      throw new Forbidden("you cannot delete someone else's comment")
    }
    targetComment.delete()
    return ('deleted')
  }


}

export const commentsService = new CommentsService()