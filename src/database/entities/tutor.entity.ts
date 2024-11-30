import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { TutorInterface } from "../interfaces/tutor.interface";
import { Transaction } from "../../payment/entities/transaction.entity";
import { Application } from "./application.entity";
import { Experience } from "./experience.entity";
import { Education } from "./education.entity";
import { Job } from "./job.entities";
import { EducationLevel } from "../enum/education.enum";
import { Geneder } from "../enum/gender.enum";
import { Student } from "./student.entity";
import { nullable } from "zod";

@Entity("tutor")
export class Tutor implements TutorInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: "enum",
    enum: Geneder,
  })
  gender: Geneder;

  @Column()
  location: string;

  @Column()
  email: string;
  @Column()
  password: string;

  @Column()
  profile: string;

  @Column()
  phone: string;

  @Column()
  occupation: string;

  @Column({
    type: "enum",
    enum: EducationLevel,
  })
  educationLevel: EducationLevel;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.tutor)
  @JoinColumn()
  transactions: Transaction[];

  @OneToMany(() => Application, (application) => application.tutor)
  @JoinColumn()
  applications: Application[];

  @OneToMany(() => Experience, (experience) => experience.tutor)
  @JoinColumn()
  experience: Experience[];

  @OneToOne(() => Education, (education) => education.tutor, { cascade: true })
  @JoinColumn({ name: "education_id" })
  education?: Education;
  @Column({ nullable: true })
  education_id?: string;

  @ManyToMany(() => Job, (job) => job.tutor)
  @JoinTable({ name: "tutor_job" })
  job: Job[];
}
