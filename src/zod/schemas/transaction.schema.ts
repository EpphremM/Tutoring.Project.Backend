import z from 'zod'
export const transactionSchema=z.object({
    amount:z.number().positive(),
    first_name:z.string().trim().max(20).min(1),
    last_name:z.string().trim().max(20).min(1),
    email:z.string().email({message:"invalid email address"}),
    phone_number:z.string().trim().min(9).max(13).refine((value)=>{
        const regex=/^(09\d{8}|07\d{8}|9\d{8}|7\d{8}|\+2517\d{8}|\+2519\d{8})$/;
        return regex.test(value);
    },{
        message:"invalid phone number format"
    }),
    callback_url:z.string().url({message:"invali callback url"}),
    return_url:z.string().url({message:"invalid return url"})
}).required();

export const transactionUpdateSchema=z.object({
    amount:z.number().positive().optional(),
    firstName:z.string().trim().max(20).min(1).optional(),
    lastName:z.string().trim().max(20).min(1).optional(),
    email:z.string().email({message:"invalid email address"}).optional(),
    phoneNumber:z.string().trim().min(9).max(13).refine((value)=>{
        const regex=/^(09\d{8}|07\d{8}|9\d{8}|7\d{8}|\+2517\d{8}|\+2519\d{8})$/;
        return regex.test(value);
    },{
        message:"invalid phone number format"
    }).optional(),
    callbackUrl:z.string().url({message:"invali callback url"}).optional(),
    returnUrl:z.string().url({message:"invalid return url"}).optional(),
}).optional();