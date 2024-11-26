import { AppDataSource } from "../data.source";
import { Application } from "../entities/application.entity";
import { ApplicationInterface } from "../interfaces/application.interface";

export class ApplicationRepository {
  applicationRepository =AppDataSource.getRepository<ApplicationInterface>(Application);
  static appRepo: ApplicationRepository | null = null;
  private constructor() {}
  async registration(application: ApplicationInterface) {
    return await this.applicationRepository.save(application);
  }
  async find() {
    return await this.applicationRepository.find();
  }
  async update(
    application: ApplicationInterface,
    newApplication: Partial<ApplicationInterface>
  ) {
    const updated: ApplicationInterface =await this.applicationRepository.merge(application, newApplication);
    return await this.applicationRepository.save(updated);
  }
  async findById(id: string) {
    return await this.applicationRepository.findOne({where:{ id }});
  }
  async Delete(id:string){
   return await this.applicationRepository.delete({id});

  }
  static getRepo() {
    if (!ApplicationRepository.appRepo) {
      ApplicationRepository.appRepo = new ApplicationRepository();
    }
    return ApplicationRepository.appRepo;
  }
}
