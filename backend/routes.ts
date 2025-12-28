import express from "express";
import { Ticket, Comment } from "./models";
import { createTicketSchema, createCommentSchema } from "./validators";

const router = express.Router();

/* Create Ticket */
router.post("/tickets", async (req, res) => {
  try {
    createTicketSchema.parse(req.body);
    const ticket = await Ticket.create(req.body);
    res.json({ status: true, message: "Ticket created successfully", data: ticket });
  } catch (err: any) {
    res.status(400).json({ status: false, error: err.errors?.[0]?.message || err.message });
  }
});

/* List Tickets */
router.get("/tickets", async (req, res) => {
  const tickets = await Ticket.find();
  res.json({ status: true, data: tickets });
});

/* Get Ticket Details */
router.get("/tickets/:id", async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ status: false, error: "Ticket not found" });
  res.json({ status: true, data: ticket });
});

/* Update Ticket */
router.patch("/tickets/:id", async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTicket) return res.status(404).json({ status: false, error: "Ticket not found" });
    res.json({ status: true, message: "Ticket updated", data: updatedTicket });
  } catch (err: any) {
    res.status(400).json({ status: false, error: err.message });
  }
});

/* Delete Ticket */
router.delete("/tickets/:id", async (req, res) => {
  const deleted = await Ticket.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ status: false, error: "Ticket not found" });
  res.json({ status: true, message: "Ticket deleted" });
});

/* Add Comment */
router.post("/tickets/:id/comments", async (req, res) => {
  try {
    createCommentSchema.parse(req.body);
    const comment = await Comment.create({ ...req.body, ticketId: req.params.id });
    res.json({ status: true, message: "Comment added", data: comment });
  } catch (err: any) {
    res.status(400).json({ status: false, error: err.errors?.[0]?.message || err.message });
  }
});

/* List Comments */
router.get("/tickets/:id/comments", async (req, res) => {
  const comments = await Comment.find({ ticketId: req.params.id });
  res.json({ status: true, data: comments });
});

export default router;
