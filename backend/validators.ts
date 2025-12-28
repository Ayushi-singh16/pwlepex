import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export const createCommentSchema = z.object({
  message: z.string(),
  author: z.enum(["CUSTOMER", "AGENT"]),
});
