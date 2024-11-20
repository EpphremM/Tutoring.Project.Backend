import z, { number } from 'zod'
export const jobSchema= z.object({
    title:z.string().trim().max(60).min(3),
    responsibility:z.string().trim().max(500).min(10),
    status:z.string().trim().min(3).max(10),
    duration:z.number().positive().max(5).min(1),
    hourlyBudget:number().positive().min(50),
    requeredGender:z.enum(["male","female","both"]),
    weeklyFrequency:z.number().max(10).min(1),
    workPeriod:z.string(),
    startingDate:z.date().refine((date)=>date<new Date(),{message:"the starting date must be in the future"}),
    experience:z.enum(["entry","mid","senior","expert",]),
    educationLevel:z.enum(["High School","University/College Student","Bachelor's","Master's"]),
    

})
