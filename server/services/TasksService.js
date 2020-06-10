import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TasksService {
  async find(query = {}) {
    return await dbContext.Tasks.find(query);
  }
  async findById(id) {
    let data = await dbContext.Tasks.findById(id);
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async create(body) {
    return await dbContext.Tasks.create(body);
  }
  async edit(body) {
    let data = await dbContext.Tasks.findByIdAndUpdate(body.id, body, {
      new: true,
    });
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }

  async delete(id) {
    let data = await dbContext.Tasks.findByIdAndDelete(id);
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async createComment(id, body) {
    let data = await dbContext.Tasks.findOneAndUpdate(
      { _id: id },
      { $addToSet: { comments: body } },
      { new: true }
    );
    return "Comment created";
  }
  async deleteComment(id, commentId) {
    await dbContext.Tasks.findOneAndUpdate(
      { _id: id },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    return "Comment Deleted";
    // data.comments.pull({ id: comment.id });
  }
  async editComment(comment) {
    await dbContext.Tasks.findOneAndUpdate(
      { _id: comment.taskId, "comments._id": comment.id },
      { $set: { "comments.$": comment } },
      { new: true }
    );
  }
}

export const tasksService = new TasksService();
