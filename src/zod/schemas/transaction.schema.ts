import z from "zod";
export const transactionSchema = z
  .object({
    amount: z.number().positive(),
    phone_number: z
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
  })
  .required();

export const transactionUpdateSchema = z
  .object({
    amount: z.number().positive().optional(),
    phone_number: z
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
      )
      .optional(),
  })
  .optional();
