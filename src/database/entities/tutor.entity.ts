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
import { Gender } from "../enum/gender.enum";
@Entity("tutor")
export class Tutor implements TutorInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender: Gender;

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
  education_level: EducationLevel;
   @Column({default:0})
   credit:number;
  @CreateDateColumn()
  created_at: Date;

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
