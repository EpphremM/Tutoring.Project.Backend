import 'reflect-metadata'
import { DogInterface } from "../interfaces/dog.interface";
import { AppDataSource } from "../data.source";
import { Dog } from "../entities/dog.entity";


export class DogRepository {
    dogRepository = AppDataSource.getRepository<DogInterface>(Dog);
    async find() {
        return await this.dogRepository.find();
    }

    async create(dog: DogInterface) {
        return await this.dogRepository.save(dog);
    }
}