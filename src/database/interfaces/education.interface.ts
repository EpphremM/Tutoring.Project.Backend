import { Decimal128, IntegerType } from "typeorm";

export interface EducationInterface {
  id: string;
  institution: string;
  CGPA: Number;
  academic_year: Number;
  resume: string;
}
