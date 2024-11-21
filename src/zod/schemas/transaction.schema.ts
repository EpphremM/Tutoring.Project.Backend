import z from 'zod'
export const transactionSchema=z.object({
    amount:z.number().positive(),
    firstName:z.string().trim().max(20).min(1),
    lastName:z.string().trim().max(20).min(1),
    email:z.string().email({message:"invalid email address"}),
    tx_ref:z.string(),
    phone:z.string().trim().min(9).max(13).refine((value)=>{
        const regex=/^(09\d{8}|07\d{8}|9\d{8}|7\d{8}|\+2517\d{8}|\+2519\d{8})$/;
        return regex.test(value);
    },{
        message:"invalid phone number format"
    }),
    callbackUrl:z.string().url({message:"invali callback url"}),
    returnUrl:z.string().url({message:"invalid return url"})
})