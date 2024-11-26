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

export const subjectUpdateSchema = z.object({
  name: z.string().optional(),
});
