import "reflect-metadata";
import { JobInterface } from "../interfaces/job.interface";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Application } from "./application.entity";
import { Tutor } from "./tutor.entity";
import { Family } from "./family.entity";
import { ExperienceLevel, JobStatus } from "../enum/job.enums";
import { JobGender } from "../enum/job.enums";
import { EducationLevel } from "../enum/education.enum";
import { Student } from "./student.entity";
@Entity("jobs")
export class Job implements JobInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ default: "Job Opportunity for Tutor Position" })
  title: string;
  @Column({
    type: "enum",
    enum: JobStatus,
  })
  status: JobStatus;
  @Column()
  duration: number;
  @Column()
  hourlyBudget: number;
  @Column({
    type: "enum",
    enum: JobGender,
  })
  requiredGender: JobGender;
  @Column()
  weeklyFrequency: number;
  @Column()
  workPeriod: String;
  @Column()
  startingDate: Date;
  @Column({ type: "enum", enum: ExperienceLevel })
  experience: ExperienceLevel;
  @Column()
  responsibility: string;
  @Column({ type: "enum", enum: EducationLevel })
  educationLevel: EducationLevel;
  @CreateDateColumn()
  createdAt: Date;
  @ManyToOne(() => Family, (family) => family.jobs)
  @JoinColumn({ name: "family_id" })
  family: Family;
  @Column()
  family_id: string;
  @OneToMany(() => Application, (application) => application.job)
  applications: Application[];
  @OneToMany(()=>Student,(student)=>student.Job)
  student:Student[]
  @ManyToMany(() => Tutor, (tutor) => tutor.job)
  @JoinTable({ name: "tutor_job" })
  tutor: Tutor[];
}
