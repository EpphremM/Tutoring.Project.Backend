import z, { number } from "zod";
export const jobSchema = z
  .object({
    title: z.string().trim().max(60).min(3),
    responsibility: z.string().trim().max(500).min(10),
    status: z.string().trim().min(3).max(10),
    duration: z.number().positive().max(10).min(1),
    hourly_budget: number().positive().min(50),
    required_gender: z.enum(["male", "female", "both"]),
    weekly_frequency: z.number().max(10).min(1),
    work_period: z.string(),
    // startingDate:z.Date().refine((date)=>date<new Date(),{message:"the starting date must be in the future"}),
    starting_date: z.preprocess((val) => new Date(val as string), z.date()),
    experience: z.enum(["entry", "mid", "senior", "expert"]),
    education_level: z.enum([
      "High School",
      "University/College Student",
      "Bachelor's",
      "Master's",
    ]),
  })
  .required();
export const jobUpdateSchema = z
  .object({
    title: z.string().trim().max(60).min(3).optional(),
    responsibility: z.string().trim().max(500).min(10).optional(),
    status: z.string().trim().min(3).max(10).optional(),
    duration: z.number().positive().max(10).min(1).optional(),
    hourly_budget: number().positive().min(50).optional(),
    required_gender: z.enum(["male", "female", "both"]).optional(),
    weekly_frequency: z.number().max(10).min(1).optional(),
    work_period: z.string().optional(),
    starting_date: z
      .preprocess((val) => new Date(val as string), z.date())
      .optional(),
    experience: z.enum(["entry", "mid", "senior", "expert"]).optional(),
    education_level: z
      .enum([
        "High School",
        "University/College Student",
        "Bachelor's",
        "Master's",
      ])
      .optional(),
  })
  .nullable();
