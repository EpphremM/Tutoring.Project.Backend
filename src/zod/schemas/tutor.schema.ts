import z from "zod";
export const tutorSchema = z
  .object({
    first_name: z.string().trim().max(10).min(3),
    last_name: z.string().trim().max(10).min(3),
    email: z.string().email({ message: "invalid email address" }),
    location: z.string(),
    phone: z
      .string()
      .trim()
      .min(9)
      .max(13)
      .refine(
        (value) => {
          const regex =
            /^(09\d{8}|07\d{8}|9\d{8}|7\d{8}|\+2517\d{8}|\+2519\d{8})$/;
          return regex.test(value);
        },
        {
          message: "invalid phone number format",
        }
      ),
    password: z.string().refine(
      (value) => {
        return (
          value.length >= 8 &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value) &&
          /\d/.test(value) &&
          /[!@#$%^&*(),.?":{}|<>]/.test(value)
        );
      },
      {
        message:
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
      }
    ),
    gender: z.string().max(4).trim(),
    profile: z.string(),
    occupation: z.string(),
    education_level: z.string(),
  })
  .required();
  export const tutorUpdateSchema = z
    .object({
      first_name: z.string().trim().max(10).min(3).optional(),
      last_name: z.string().trim().max(10).min(3).optional(),
      email: z.string().email({ message: "invalid email address" }).optional(),
      location: z.string().optional(),
      phone: z
        .string()
        .trim()
        .min(9)
        .max(13)
        .refine(
          (value) => {
            const regex =
              /^(09\d{8}|07\d{8}|9\d{8}|7\d{8}|\+2517\d{8}|\+2519\d{8})$/;
            return regex.test(value);
          },
          {
            message: "invalid phone number format",
          }
        ).optional(),
      password: z.string().refine(
        (value) => {
          return (
            value.length >= 8 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /\d/.test(value) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(value)
          );
        },
        {
          message:
            "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
        }
      ).optional(),
      gender: z.string().max(4).trim().optional(),
      profile: z.string().optional(),
      occupation: z.string().optional(),
      education_level: z.string().optional(),
    }).nullable();
  