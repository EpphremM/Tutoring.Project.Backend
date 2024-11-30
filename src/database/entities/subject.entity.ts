import { SubjectInterface } from "../interfaces/subject.interface";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from "typeorm";
import { Student } from "./student.entity";
@Entity("subjects")
export class Subject implements SubjectInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ default: "All" })
  name: string;
  @CreateDateColumn()
  created_at: Date;
  @ManyToMany(() => Student, (student) => student.subjects)
  students: Student[];
}
