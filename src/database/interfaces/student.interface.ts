import { SubjectInterface } from "./subject.interface";

export interface StudentInterface{
    id:string,
    grade:string,
    created_at:Date,
    subjects?:SubjectInterface[]
}