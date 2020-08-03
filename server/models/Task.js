import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Comment = new Schema({
  body: { type: String, required: true },
  creatorEmail: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

const Task = new Schema({
  body: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  color: { type: String },
  comments: [Comment]
}, { timestamps: true, toJSON: { virtuals: true } })

Task.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })


export default Task