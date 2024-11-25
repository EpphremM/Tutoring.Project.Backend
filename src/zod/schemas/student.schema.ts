import z from 'zod'
export const studentSchema=z.object({
    grade:z.string()
}).required();

export const studentUpdateSchema=z.object({
    grade:z.string().optional()
});