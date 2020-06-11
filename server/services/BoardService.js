import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BoardService {
  async getAll(userEmail) {
    return await dbContext.Boards.find({ collaborators: userEmail }).populate(
      "creator",
      "name picture"
    );
  }
  // async getAllCollabBoards(userEmail) {
  //   return await dbContext.Boards.find({ collaborators: userEmail }).populate(
  //     "creator",
  //     "name picture"
  //   );
  // }

  async getById(id, userEmail) {
    let data = await dbContext.Boards.findOne({
      _id: id,
      collaborators: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async create(rawData) {
    let data = await dbContext.Boards.create(rawData);
    return data;
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Boards.findOneAndUpdate(
      { _id: id, collaborators: userEmail },
      update,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }
  async addCollab(id, userEmail, update) {
    await dbContext.Boards.findOneAndUpdate(
      { _id: id, creatorEmail: userEmail },
      { $addToSet: { collaborators: update.email } },
      { new: true }
    );
    return "collab Added";
  }
  async deleteCollab(id, data) {
    await dbContext.Boards.findOneAndUpdate(
      { _id: id },
      { $pull: { collaborators: data.collab } }
    );
  }

  async delete(id, userEmail) {
    let data = await dbContext.Boards.findOneAndRemove({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }
}

export const boardService = new BoardService();
