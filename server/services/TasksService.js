import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TasksService {
  async createComment(body) {
    let data = await dbContext.Tasks.findById(body.taskId);

    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    // @ts-ignore
    data.comments.push(body);
  }
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
}

export const tasksService = new TasksService();
