import "reflect-metadata";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApplicationInterface } from "../interfaces/application.interface";
import { Job } from "./job.entities";
import { Tutor } from "./tutor.entity";
import { ApplicationStatus } from "../enum/status.enum";
@Entity("application")
export class Application implements ApplicationInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  cover: string;
  @Column({ default: "pending", type: "enum", enum: ApplicationStatus })
  status: ApplicationStatus;
  @CreateDateColumn()
  createdAt: Date;
  @ManyToOne(() => Job, (job) => job.applications, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: "job_id" })
  job: Job;
  @Column({ nullable: true })
  job_id: string;
  @ManyToOne(() => Tutor, (tutor) => tutor.applications, {
    cascade: true,
  })
  @JoinColumn({ name: "tutor_id" })
  tutor: Tutor;
  @Column()
  tutor_id: string;
}
