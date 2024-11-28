import { Repository } from "typeorm";
import { AppDataSource } from "../data.source";
import { Job } from "../entities/job.entities";
import { FamilyInterface } from "../interfaces/family.interface";
import { JobInterface } from "../interfaces/job.interface";
import { TutorRepository } from "./tutor.repository";
import { JobFilterDto } from "../../dto/filter.dto";
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
    return await this.jobRpository
      .createQueryBuilder("jobs")
      .leftJoinAndSelect("jobs.tutor", "tutor")
      .leftJoinAndSelect("jobs.family", "families")
      .leftJoinAndSelect("jobs.applications", "application")
      .leftJoinAndSelect("jobs.students", "students")
      .leftJoinAndSelect("students.subjects", "subjects")
      .getMany();
  }
  async findById(id: string) {
    return await this.jobRpository.findOne({ where: { id } });
  }
  async update(job: JobInterface, newJob: Partial<JobInterface>) {
    const updated = await this.jobRpository.merge(job, newJob);
    return await this.jobRpository.save(updated);
  }
  async Delete(id: string) {
    return await this.jobRpository.delete({ id });
  }
  async filterJob(Dto: JobFilterDto) {
    return await this.applyFilters(Dto);
  }
  private async applyFilters(filterDto: JobFilterDto) {
    const query = this.jobRpository
      .createQueryBuilder("jobs")
      .leftJoinAndSelect("jobs.students", "students")
      .leftJoinAndSelect("students.subjects", "subjects");

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
      educationLevel,
      students,
      subjects,
    } = filterDto;
    if (status) query.andWhere("jobs.status = :status", { status });
    if (minDuration)
      query.andWhere("jobs.duration >= :minDuration", { minDuration });
    if (maxDuration)
      query.andWhere("jobs.duration <= :maxDuration", { maxDuration });
    if (minHourlyBudget)
      query.andWhere("jobs.hourlyBudget >= :minHourlyBudget", {
        minHourlyBudget,
      });
    if (maxHourlyBudget)
      query.andWhere("jobs.hourlyBudget <= :maxHourlyBudget", {
        maxHourlyBudget,
      });
    if (weeklyFrequency)
      query.andWhere("jobs.weeklyFrequency = :weeklyFrequency", {
        weeklyFrequency,
      });
    // if (Array.isArray(students) && students.length > 0) {
    //   query.andWhere("students.grade IN (:...students)", { students });
    // }
    // if (Array.isArray(subjects) && subjects.length > 0) {
    //   query.andWhere("subjects.name IN (:...subjects)", { subjects });
    // }

    // console.log("STUDENTS: ", students);
    if (students) {
      query.andWhere("students.grade IN (:...students)", {
        students: students.includes(",") ? students.split(",") : [students],
      });
    }

    if (subjects) {
      query.andWhere("subjects.name IN (:...subjects)", {
        subjects: subjects.includes(",") ? subjects.split(",") : [subjects],
      });
    }

    if (workPeriod)
      query.andWhere("jobs.workPeriod = :workPeriod", { workPeriod });
    if (startingDate)
      query.andWhere("jobs.startingDate >= :startingDate", { startingDate });
    if (requiredGender)
      query.andWhere("jobs.requiredGender = :requiredGender", {
        requiredGender,
      });
    if (experience)
      query.andWhere("jobs.experience = :experience", { experience });
    if (educationLevel)
      query.andWhere("jobs.educationLevel = :educationLevel", {
        educationLevel,
      });
    // console.log(query.getQuery());
    // console.log(query.getParameters())
    return await query.getMany();
  }
  static getRepo() {
    if (!JobRepository.jobRepo) {
      JobRepository.jobRepo = new JobRepository();
    }
    return JobRepository.jobRepo;
  }
}
