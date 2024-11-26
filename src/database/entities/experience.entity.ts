import 'reflect-metadata'
import { ExperienceInterface } from "../interfaces/experience.interface";
import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Tutor } from "./tutor.entity";
@Entity('experiences')
export class Experience implements ExperienceInterface{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    workedAt: string;
    @Column()
    description: string;
    @Column()
    statingDate: Date;
    @Column()
    endingDate: Date;
    @CreateDateColumn()
    createdAt: Date;
    @ManyToOne(()=>Tutor,(tutor)=>tutor.experience,{cascade:true})
    @JoinColumn({name:"tutor_id"})
    tutor:Tutor
    @Column()
    tutor_id:string
}