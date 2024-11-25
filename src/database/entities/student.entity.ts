import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, ManyToMany, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import { StudentInterface } from "../interfaces/student.interface";
import { Subject } from './subject.entity';
import { Tutor } from "./tutor.entity";
import { Job } from "./job.entities";
@Entity('students')
export class Student implements StudentInterface{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    grade:string
    @CreateDateColumn()
    createdAt: Date;
    @ManyToMany(()=>Subject,(subject)=>subject.student,{cascade:true})
    @JoinTable({name:"student_subject"})
    subject:Subject[]

    @ManyToOne(()=>Job,(job)=>job.student)
    @JoinColumn({name:"job_id"})
    Job:Job
    @Column()
    job_id:string

}