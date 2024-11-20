import {Repository } from "typeorm";
import { Tutor } from "../entities/tutor.entity";
import { FamilyInterface } from '../interfaces/family.interface';
import { AppDataSource } from "../data.source";
import { Family } from '../entities/family.entity';
export class FamilyRepository{
    familyRepository=AppDataSource.getRepository<FamilyInterface>(Family);
    async register(family:FamilyInterface){
        return await this.familyRepository.save(family);
    }
    async find (){
        return await this.familyRepository.find();
    }
    async findById(id:string){
        return await this.familyRepository.findOne({where:{id}});
    }
    async update(family:FamilyInterface,newFamily:Partial<FamilyInterface>){
      const updated= await this.familyRepository.merge(family,newFamily);
      return await this.familyRepository.save(updated);
    }
}