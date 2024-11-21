import 'reflect-metadata'
import { TransactionInterface } from "../interfaces/transaction.interface";
import { AfterUpdate, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Decimal128, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tutor } from "./tutor.entity";
import { Family } from "./family.entity";
@Entity('transaction')
export class Transaction implements TransactionInterface{
    @PrimaryGeneratedColumn('uuid')
    @Column({nullable:false})
    id: string;

    @Column()
    amount: Number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column({nullable:false,update:false})
    tx_ref:string

    @Column()
    email:string

    @Column()
    phoneNumber:string

    @Column()
    callbackUrl:string;

    @Column()
    returnUrl:string;

   @CreateDateColumn()
    createAt: Date;
    @BeforeInsert()
    setTx_ref(){
        if(!this.tx_ref){
            this.tx_ref=this.id+this.createAt;
        }
    }

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