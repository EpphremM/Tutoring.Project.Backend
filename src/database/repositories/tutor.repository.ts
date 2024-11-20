import { AppDataSource } from "../data.source";
import { Family } from "../entities/family.entity";
import { FamilyInterface } from "../interfaces/family.interface";
import { TutorInterface } from "../interfaces/tutor.interface";
import { Tutor } from "../entities/tutor.entity";
import { Education } from "../entities/education.entity";
import { promises } from "dns";

export class TutorRepository {
  tutorRepository = AppDataSource.getRepository<TutorInterface>(Tutor);
  async register(tutor: TutorInterface) {
    return await this.tutorRepository.save(tutor);
  }
  async find() {
    return await this.tutorRepository.find();
  }
  async findOneById(id: string) {
    return await this.tutorRepository.findOne({ where: { id } });
  }
  async update(tutor: TutorInterface, newTutor: Partial<TutorInterface>) {
    const updated = await this.tutorRepository.merge(tutor, newTutor);
    return await this.tutorRepository.save(updated);
  }
}
