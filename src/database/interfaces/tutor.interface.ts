import { Timestamp } from "typeorm";
import { JobInterface } from "./job.interface";
export interface TutorInterface {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  password: string;
  profile: string;
  location: string;
  email: string;
  phone: string;
  occupation: string;
  education_level: string;
  created_at: Date;
  job?: JobInterface[];
}
