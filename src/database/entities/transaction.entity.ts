import "reflect-metadata";
import { nanoid } from "nanoid";
import { TransactionInterface } from "../interfaces/transaction.interface";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tutor } from "./tutor.entity";
import { Family } from "./family.entity";
@Entity("transaction")
export class Transaction implements TransactionInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  amount: Number;

  @Column({
    update: false,
    unique: true,
    default: nanoid(20),
  })
  tx_ref: string;
  @Column()
  callbackUrl: string;

  @Column()
  returnUrl: string;

  @CreateDateColumn({ name: "created_at", update: false })
  createdAt: Date;
  @ManyToOne(() => Tutor, (tutor) => tutor.transactions, { cascade: true })
  @JoinColumn({ name: "tutor_id" })
  tutor: Tutor;
  @Column({ nullable: true })
  tutor_id: String;

  @ManyToOne(() => Family, (family) => family.trasactions, { cascade: true })
  @JoinColumn({ name: "family_id" })
  family: Family;
  @Column({ nullable: true })
  family_id: string;
}
