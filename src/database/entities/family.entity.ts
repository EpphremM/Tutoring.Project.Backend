import "reflect-metadata";
import { Transaction } from "../../payment/entities/transaction.entity";
import { FamilyInterface } from "../interfaces/family.interface";
import { Tutor } from "./tutor.entity";
import { Job } from "./job.entities";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

@Entity("families")
export class Family implements FamilyInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  location: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;
  @OneToMany(() => Job, (job) => job.family)
  jobs: Job[];
  @OneToMany(() => Transaction, (transaction) => transaction.family)
  transactions?: Transaction[];
}
