import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class ListsService {
  async find(query = {}) {
    return await dbContext.Lists.find(query);
  }
  async findById(id) {
    let data = await dbContext.Lists.findById(id);
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async create(body) {
    return await dbContext.Lists.create(body);
  }
  async edit(body) {
    let data = await dbContext.Lists.findByIdAndUpdate(body.id, body, {
      new: true,
    });
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async delete(id) {
    let data = await dbContext.Lists.findByIdAndDelete(id);
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
}

export const listsService = new ListsService();
