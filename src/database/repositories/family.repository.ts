import { Repository } from "typeorm";
import { Tutor } from "../entities/tutor.entity";
import { FamilyInterface } from "../interfaces/family.interface";
import { AppDataSource } from "../data.source";
import { Family } from "../entities/family.entity";
import { Job } from "../entities/job.entities";
export class FamilyRepository {
  static familyRepo: FamilyRepository | null = null;
  private constructor() {}
  familyRepository = AppDataSource.getRepository<FamilyInterface>(Family);
  async register(family: FamilyInterface) {
    return await this.familyRepository.save(family);
  }
  async findAll() {
    // return await this.familyRepository.find({
    //   relations: ["jobs"],
    // });
    return await this.familyRepository.
    createQueryBuilder('families').
    leftJoinAndSelect('families.jobs','jobs').
    leftJoinAndSelect('families.transactions','transaction').getMany();

  }
  async findById(id: string) {
    return await this.familyRepository.findOne({
      where: { id },
      relations: ["jobs"],
    });
  }
  async findByEmail(email: string) {
    return await this.familyRepository.findOne({
      where: { email },
      relations: ["jobs"],
    });
  }
  async update(family: FamilyInterface, newFamily: Partial<FamilyInterface>) {
    const updated = await this.familyRepository.merge(family, newFamily);
    return await this.familyRepository.save(updated);
  }

  static getRepo() {
    if (!FamilyRepository.familyRepo) {
      FamilyRepository.familyRepo = new FamilyRepository();
    }

    return FamilyRepository.familyRepo;
  }
}