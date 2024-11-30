import { TransactionInterface } from "../interfaces/transaction.interface";
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Status } from "../enum/status.enum";
import { Tutor } from "../../database/entities/tutor.entity";
import { Family } from "../../database/entities/family.entity";
@Entity("transaction")
export class Transaction implements TransactionInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  phone_number: string;
  @Column()
  amount: Number;

  @Column({
    unique: true,
  })
  @Generated("uuid")
  tx_ref: string;
  @Column({enum:Status,type:"enum",default:"pending"})
  status: Status;
  @Column({nullable:true})
  callback_url: string;

  @Column({nullable:true})
  return_url: string;

  @CreateDateColumn({ name: "created_at", update: false })
  created_at: Date;
  @ManyToOne(() => Tutor, (tutor) => tutor.transactions, { cascade: true })
  @JoinColumn({ name: "tutor_id" })
  tutor: Tutor;
  @Column({ nullable: true })
  tutor_id: string;

  @ManyToOne(() => Family, (family) => family.transactions, { cascade: true })
  @JoinColumn({ name: "family_id" })
  family: Family;
  @Column({ nullable: true })
  family_id: string;
}
