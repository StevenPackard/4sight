import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = mongoose.Types.ObjectId;

const commentSchema = new Schema(
  {
    title: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    taskId: { type: ObjId, ref: "Task", required: true },
    listId: { type: ObjId, ref: "List", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
const Task = new Schema(
  {
    title: { type: String, required: true },
    listId: { type: ObjId, ref: "List", required: true },
    // boardId: { type: ObjId, ref: "Board", required: true },
    creatorEmail: { type: String, required: true },
    comments: [commentSchema],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Task;
