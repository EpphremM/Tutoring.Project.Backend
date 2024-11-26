import { SubjectInterface } from "./subject.interface";

export interface StudentInterface{
    id:string,
    grade:string,
    createdAt:Date,
    subjects?:SubjectInterface[]
}