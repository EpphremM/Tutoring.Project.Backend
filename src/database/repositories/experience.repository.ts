import { AppDataSource } from "../data.source";
import { Experience } from "../entities/experience.entity";
import { ExperienceInterface } from "../interfaces/experience.interface";
import { TutorInterface } from "../interfaces/tutor.interface";

export class ExperienceRepository {
  experienceRepository =
    AppDataSource.getRepository<ExperienceInterface>(Experience);
  static expericeRepo: ExperienceRepository | null = null;
  private constructor() {}
  async register(experience: ExperienceInterface) {
    return this.experienceRepository.save(experience);
  }
  async find() {
    return this.experienceRepository.find();
  }
  async findById(id:string) {
    return this.experienceRepository.findOne({where:{id}});
  }
  async update(
    experience: ExperienceInterface,
    newExperience: Partial<Experience>
  ) {
    const updated = this.experienceRepository.merge(experience, newExperience);
    return this.experienceRepository.save(updated);
  }
  async findByWorkedAt(worked_at: string) {
    return this.experienceRepository.findOne({ where: {worked_at} });
  }
  async Delete(id:string){
    return this.experienceRepository.delete({id});
  }
  static getRepo() {
    if (!ExperienceRepository.expericeRepo) {
      ExperienceRepository.expericeRepo = new ExperienceRepository();
    }
    return ExperienceRepository.expericeRepo;
  }
}
