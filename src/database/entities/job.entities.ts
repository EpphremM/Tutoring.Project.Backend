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
  hourly_budget: number;
  @Column({
    type: "enum",
    enum: JobGender,
  })
  required_gender: JobGender;
  @Column()
  weekly_frequency: number;
  @Column()
  work_period: String;
  @Column()
  starting_date: Date;
  @Column({ type: "enum", enum: ExperienceLevel })
  experience: ExperienceLevel;
  @Column()
  responsibility: string;
  @Column({ type: "enum", enum: EducationLevel,nullable:true })
  education_level: EducationLevel;
  @Column({ type: "tsvector", nullable: true, select: false })
  tsvector: string;
  @CreateDateColumn()
  created_at: Date;
  @ManyToOne(() => Family, (family) => family.jobs)
  @JoinColumn({ name: "family_id" })
  family: Family;
  @Column()
  family_id: string;
  @OneToMany(() => Application, (application) => application.job)
  applications: Application[];
  @OneToMany(() => Student, (student) => student.Job)
  students: Student[];
  @ManyToMany(() => Tutor, (tutor) => tutor.job)
  @JoinTable({ name: "tutor_job" })
  tutor: Tutor[];
}
