import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const List = new Schema(
  {
    title: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    boardId: { type: ObjectId, ref: "Board", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

List.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

//CASCADE ON DELETE
List.pre("findOneAndRemove", function (next) {
  //lets find all the lists and remove them
  Promise.all([
    // @ts-ignore
    dbContext.Tasks.deleteMany({ listId: this._conditions._id }),
  ])
    .then(() => next())
    .catch((err) => next(err));
});

export default List;
