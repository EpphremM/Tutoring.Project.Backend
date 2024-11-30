import z from "zod";
export const experienceSchema = z
  .object({
    worked_at: z.string(),
    description: z.string().max(200).min(10),
    stating_date: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "invalid date format",
      }),
    ending_date: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "invalid date format",
      }),
  })
  .required()
  .refine((date) => new Date(date.stating_date) <= new Date(date.ending_date), {
    message: "starting date must be later or equal to ending date",
  });
  export const experienceUpdateSchema = z
    .object({
      worked_at: z.string().optional(),
      description: z.string().max(200).min(10).optional(),
      stating_date: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: "invalid date format",
        }).optional(),
      ending_date: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: "invalid date format",
        }).optional(),
    })
    .refine((date) => new Date(date.stating_date) <= new Date(date.ending_date), {
      message: "starting date must be later or equal to ending date",
    });
  