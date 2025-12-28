import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      default: "OPEN",
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },
  },
  { timestamps: true }
);

const CommentSchema = new mongoose.Schema(
  {
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
    message: String,
    author: { type: String, enum: ["CUSTOMER", "AGENT"] },
  },
  { timestamps: true }
);

export const Ticket = mongoose.model("Ticket", TicketSchema);
export const Comment = mongoose.model("Comment", CommentSchema);
