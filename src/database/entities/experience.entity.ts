import 'reflect-metadata'
import { ExperienceInterface } from "../interfaces/experience.interface";
import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Tutor } from "./tutor.entity";
@Entity('experiences')
export class Experience implements ExperienceInterface{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    worked_at: string;
    @Column()
    description: string;
    @Column()
    stating_date: Date;
    @Column()
    ending_date: Date;
    @CreateDateColumn()
    created_at: Date;
    @ManyToOne(()=>Tutor,(tutor)=>tutor.experience,{cascade:true})
    @JoinColumn({name:"tutor_id"})
    tutor:Tutor
    @Column()
    tutor_id:string
}