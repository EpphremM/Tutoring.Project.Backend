import "reflect-metadata";
import { EducationInterface } from "../interfaces/education.interface";
import { Tutor } from "./tutor.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Decimal128,
  IntegerType,
  OneToOne,
  JoinColumn,
} from "typeorm";
@Entity("education")
export class Education implements EducationInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  institution: string;
  @Column()
  CGPA: Number;
  @Column()
  academic_year: Number;
  @Column()
  resume: string;
  @OneToOne(() => Tutor, (tutor) => tutor.education)
  @JoinColumn({ name: "tutor_id" })
  tutor?: Tutor;
  @Column()
  tutor_id: string;
}
