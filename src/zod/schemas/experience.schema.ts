import z from "zod";
export const experienceSchema = z
  .object({
    workedAt: z.string(),
    description: z.string().max(200).min(10),
    statingDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "invalid date format",
      }),
    endingDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "invalid date format",
      }),
  })
  .required()
  .refine((date) => new Date(date.statingDate) <= new Date(date.endingDate), {
    message: "starting date must be later or equal to ending date",
  });
  export const experienceUpdateSchema = z
    .object({
      workedAt: z.string().optional(),
      description: z.string().max(200).min(10).optional(),
      statingDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: "invalid date format",
        }).optional(),
      endingDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: "invalid date format",
        }).optional(),
    })
    .refine((date) => new Date(date.statingDate) <= new Date(date.endingDate), {
      message: "starting date must be later or equal to ending date",
    });
  