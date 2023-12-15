import mongoose from "mongoose";
import { bookSchema } from "../schema/bookSchema.js";

export const BookModal = mongoose.model('book', bookSchema);