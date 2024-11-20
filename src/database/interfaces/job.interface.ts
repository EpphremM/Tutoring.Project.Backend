import { Decimal128, IntegerType } from "typeorm";

export interface JobInterface {
  id: string;
  title: string;
  status: string;
  duration: number;
  hourlyBudget: number;
  weeklyFrequency: number;
  workPeriod: String;
  startingDate: Date;
  requiredGender: string;
  experience: string;
  responsibility: string;
  educationLevel: string;
  createdAt: Date;
}
