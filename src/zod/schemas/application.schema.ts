import z from "zod";
export const applicationSchema = z
  .object({
    cover: z.string().min(10).max(250),
    status: z.enum(["pending", "accepted", "rejected"]),
  })
  .required();
