import { Repository } from "typeorm";
import { AppDataSource } from "../data.source";
import { Job } from "../entities/job.entities";
import { FamilyInterface } from "../interfaces/family.interface";
import { JobInterface } from "../interfaces/job.interface";

export class JobRepository{
    jobRpository=AppDataSource.getRepository<JobInterface>(Job);
    async register(job:JobInterface){
        return await this.jobRpository.save(job);
    }
    async find(){
        return await this.jobRpository.find({relations:['families']});
    }
    async findById(id:string){
     return await this.jobRpository.findOne({where:{id}});
    }
    async update(job:JobInterface,newJob:Partial<JobInterface>){
        const updated=await this.jobRpository.merge(job,newJob);
        return await this.jobRpository.save(updated);
    }
}