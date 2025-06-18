import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  description: string;
  created_at: Date;
}

const TaskSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
