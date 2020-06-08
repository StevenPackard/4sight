import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import BoardSchema from "../models/Board";
import ListsSchema from "../models/List";
import TasksSchema from "../models/Task";
class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Boards = mongoose.model("Board", BoardSchema);
  Lists = mongoose.model("List", ListsSchema);
  Tasks = mongoose.model("Task", TasksSchema);
}

export const dbContext = new DbContext();
