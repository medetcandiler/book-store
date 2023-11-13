import { Schema } from "mongoose";

export const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true
    },
    publishYear: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true
  }
)