import z from 'zod'
export const subjectSchema=z.object({
    name:z.string()
}).required();

export const subjectUpdateSchema=z.object({
    name:z.string().optional()
})