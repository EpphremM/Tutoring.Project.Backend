import 'reflect-metadata'
import { TransactionInterface } from "../interfaces/transaction.interface";
import { Column, CreateDateColumn, Decimal128, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tutor } from "./tutor.entity";
import { Family } from "./family.entity";
@Entity('transaction')
export class Transaction implements TransactionInterface{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
   amount: Number;

    @Column()
    tx_ref:string

    @Column()
    email:string

    @Column()
    phoneNumber:string

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    callbackUrl:string;

    @Column()
    returnUrl:string;

   @CreateDateColumn()
    createAt: Date;

    @ManyToOne(()=>Tutor,(tutor)=>tutor.transactions,{cascade:true})
    @JoinColumn({name:"tutor_id"})
    tutor:Tutor
    @Column()
    tutor_id:String;

    @ManyToOne(()=>Family,(family)=>family.trasactions,{cascade:true})
    @JoinColumn({name:"family_id"})
    family:Family;
    @Column()
    family_id:string;


}