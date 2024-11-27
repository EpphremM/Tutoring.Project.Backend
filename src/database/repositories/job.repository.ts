import { Repository } from "typeorm";
import { AppDataSource } from "../data.source";
import { Job } from "../entities/job.entities";
import { FamilyInterface } from "../interfaces/family.interface";
import { JobInterface } from "../interfaces/job.interface";
import { TutorRepository } from "./tutor.repository";
import { JobFilterDto } from '../../dto/filter.dto';
import { title } from "process";

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
  async filterJob(Dto:JobFilterDto){
    return this.applyFilters(Dto);
  

  }
  private applyFilters(filterDto: JobFilterDto) {
   const query=this.jobRpository.createQueryBuilder('jobs');
    const {
      status,
      minDuration,
      maxDuration,
      minHourlyBudget,
      maxHourlyBudget,
      weeklyFrequency,
      workPeriod,
      startingDate,
      requiredGender,
      experience,
      responsibility,
      educationLevel,
      createdAfter,
      createdBefore,
    } = filterDto;

    if (status) query.andWhere("job.status = :status", { status });
    if (minDuration) query.andWhere("job.duration >= :minDuration", { minDuration });
    if (maxDuration) query.andWhere("job.duration <= :maxDuration", { maxDuration });
    if (minHourlyBudget) query.andWhere("job.hourlyBudget >= :minHourlyBudget", { minHourlyBudget });
    if (maxHourlyBudget) query.andWhere("job.hourlyBudget <= :maxHourlyBudget", { maxHourlyBudget });
    if (weeklyFrequency) query.andWhere("job.weeklyFrequency = :weeklyFrequency", { weeklyFrequency });
    if (workPeriod) query.andWhere("job.workPeriod = :workPeriod", { workPeriod });
    if (startingDate) query.andWhere("job.startingDate >= :startingDate", { startingDate });
    if (requiredGender) query.andWhere("job.requiredGender = :requiredGender", { requiredGender });
    if (experience) query.andWhere("job.experience = :experience", { experience });
    if (responsibility) query.andWhere("job.responsibility = :responsibility", { responsibility });
    if (educationLevel) query.andWhere("job.educationLevel = :educationLevel", { educationLevel });
    if (createdAfter) query.andWhere("job.createdAt >= :createdAfter", { createdAfter });
    if (createdBefore) query.andWhere("job.createdAt <= :createdBefore", { createdBefore });
    return query.getMany();
  }
  static getRepo() {
    if (!JobRepository.jobRepo) {
      JobRepository.jobRepo = new JobRepository();
    }
    return JobRepository.jobRepo;
  }
}
