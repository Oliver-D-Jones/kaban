import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class TasksService {
  async getAll(userEmail) {
    return await dbContext.Tasks.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    let data = await dbContext.Tasks.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }
  async getByParentId(id) {
    let data = await dbContext.Tasks.find({ list: id }).populate("list")
    if (!data) {
      throw new BadRequest("there are no tasks on this board")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Tasks.create(rawData)
    return data
  }

  // Creation of comments
  async createComment(taskId, body) {
    return await dbContext.Tasks.findByIdAndUpdate(
      { _id: taskId },
      { $addToSet: { comments: body } },
      { new: true }
    );
  }

  // edits the comment
  async editCommentBody(taskId, commentId, body) {
    return await dbContext.Tasks.updateOne(
      { _id: taskId, "comment._id": commentId },
      { $set: { "comment.$.body": body.score } },
      { new: true })
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Tasks.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Tasks.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }

}


export const tasksService = new TasksService()