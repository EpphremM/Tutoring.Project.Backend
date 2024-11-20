import { Timestamp } from "typeorm";
export interface TutorInterface {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  password: string;
  profile: string;
  location: string;
  email: string;
  phone: string;
  occupation: string;
  educationLevel: string;
  createdAt: Date;
}
