import { Decimal128, IntegerType } from "typeorm";

export interface JobInterface {
  id: string;
  title: string;
  status: string;
  duration: number;
  hourly_budget: number;
  weekly_frequency: number;
  work_period: String;
  starting_date: Date;
  required_gender: string;
  experience: string;
  responsibility: string;
  education_level: string;
  created_at: Date;
  family_id:string;
}
