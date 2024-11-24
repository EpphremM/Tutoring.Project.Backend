import { AppDataSource } from "../data.source";
import { Family } from "../entities/family.entity";
import { FamilyInterface } from "../interfaces/family.interface";
import { TutorInterface } from "../interfaces/tutor.interface";
import { Tutor } from "../entities/tutor.entity";
import { Education } from "../entities/education.entity";
import { promises } from "dns";
import { JobInterface } from "../interfaces/job.interface";

export class TutorRepository {
  tutorRepository = AppDataSource.getRepository<TutorInterface>(Tutor);
   static TutorRepo:TutorRepository|null;
  private constructor(){}
  async register(tutor: TutorInterface) {
    return await this.tutorRepository.save(tutor);
  }

  async apply(tutor: TutorInterface, job: JobInterface) {
    tutor.job ? tutor.job.push(job) : (tutor.job = [job]);
    return await this.tutorRepository.save(tutor);
  }
  async find() {
    return await this.tutorRepository.find({
      relations: ["job"],
    });
  }
  async findOneById(id: string) {
    return await this.tutorRepository.findOne({ where: { id } });
  }
  async findByEmail(email: string) {
    return await this.tutorRepository.findOne({ where: { email } });
  }
  async update(tutor: TutorInterface, newTutor: Partial<TutorInterface>) {
    const updated = await this.tutorRepository.merge(tutor, newTutor);
    return await this.tutorRepository.save(updated);
  }
  static getRepo(){
    if(!TutorRepository.TutorRepo){
      TutorRepository.TutorRepo=new TutorRepository();
    }
    return TutorRepository.TutorRepo;
  }
}
