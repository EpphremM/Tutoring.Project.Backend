import { Repository } from "typeorm";
import { AppDataSource } from "../data.source";
import { Job } from "../entities/job.entities";
import { FamilyInterface } from "../interfaces/family.interface";
import { JobInterface } from "../interfaces/job.interface";
import { TutorRepository } from "./tutor.repository";

export class JobRepository {
  static jobRepo: JobRepository | null = null;
  private constructor() {}
  jobRpository = AppDataSource.getRepository<JobInterface>(Job);
  async register(job: JobInterface) {
    return await this.jobRpository.save(job);
  }
  async find() {
    // return await this.jobRpository.find({ relations: ["family", "tutor","application"] });
    return await this.jobRpository.createQueryBuilder('jobs').
    leftJoinAndSelect('jobs.tutor','tutor').
    leftJoinAndSelect('jobs.family','families').
    leftJoinAndSelect('jobs.applications','application').
    leftJoinAndSelect('jobs.student','students').getMany();
  }
  async findById(id: string) {
    return await this.jobRpository.findOne({ where: { id } });
  }
  async update(job: JobInterface, newJob: Partial<JobInterface>) {
    const updated = await this.jobRpository.merge(job, newJob);
    return await this.jobRpository.save(updated);
  }
  async Delete(id:string){
    return await this.jobRpository.delete({id})
  }
  static getRepo() {
    if (!JobRepository.jobRepo) {
      JobRepository.jobRepo = new JobRepository();
    }
    return JobRepository.jobRepo;
  }
}
