import mongoose from "mongoose";
import { bookSchema } from "../schema/bookSchema.js";

export const Book = mongoose.model('book', bookSchema);