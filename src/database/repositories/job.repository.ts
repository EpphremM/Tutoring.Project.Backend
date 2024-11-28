import { Repository } from "typeorm";
import { AppDataSource } from "../data.source";
import { Job } from "../entities/job.entities";
import { FamilyInterface } from "../interfaces/family.interface";
import { JobInterface } from "../interfaces/job.interface";
import { TutorRepository } from "./tutor.repository";
import { JobFilterDto } from "../../dto/filter.dto";
import { title } from "process";
import { PaginationDto } from '../../dto/pagination.dto';
import { OrderByDto } from "../../dto/orderBy.dto";

export class JobRepository {
  static jobRepo: JobRepository | null = null;
  private constructor() {}
  jobRpository = AppDataSource.getRepository<JobInterface>(Job);
  async register(job: JobInterface) {
    return await this.jobRpository.save(job);
  }
  async find(paginationDto:PaginationDto) {
    const {status}=new JobFilterDto();
    const {page,limit}=paginationDto;
    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;
    const skip = (parsedPage - 1) * parsedLimit;
   const query= this.jobRpository
      .createQueryBuilder("jobs")
      .leftJoinAndSelect("jobs.tutor", "tutor")
      .leftJoinAndSelect("jobs.family", "families")
      .leftJoinAndSelect("jobs.applications", "application")
      .leftJoinAndSelect("jobs.students", "students")
      .leftJoinAndSelect("students.subjects", "subjects")
      .skip(skip)
      .take(parsedLimit);
      const [jobs,total]=await query.getManyAndCount();
      const totalPages=(total/parsedPage);
      return {
        jobs,
        limit:parsedLimit,
        total,
        totalPages
      }
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
  async filterJob(Dto: JobFilterDto,paginationDto:PaginationDto,orderDto:OrderByDto) {
    return await this.applyFilters(Dto,paginationDto,orderDto);
  }
  private async applyFilters(filterDto: JobFilterDto,paginationDto:PaginationDto,orderDto:OrderByDto) {
    const {page,limit}=paginationDto;
    let {sortFields,sortDirection}=orderDto;
    const sort =sortFields.includes(",")?sortFields.split(","):[sortFields]
   const direction=sortDirection;
   console.log("sort",sort);
   console.log("dirction",direction);
    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;
    const skip = (parsedPage - 1) * parsedLimit;
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
    const orderByClauses = {};

sort.forEach(field => {
    orderByClauses[`jobs.${field}`] = direction;
});
query.orderBy(orderByClauses);
    query.skip(skip).take(parsedLimit).orderBy(orderByClauses);
    const [jobs,total]=await query.getManyAndCount();
    const totalPages=Math.ceil((total/parsedPage));
    return{
      jobs,
      total,
      parsedLimit,
      totalPages
    }
  }
  static getRepo() {
    if (!JobRepository.jobRepo) {
      JobRepository.jobRepo = new JobRepository();
    }
    return JobRepository.jobRepo;
  }
}
