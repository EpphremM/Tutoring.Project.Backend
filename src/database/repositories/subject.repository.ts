import { AppDataSource } from "../data.source";
import { Subject } from "../entities/subject.entity";
import { StudentInterface } from "../interfaces/student.interface";
import { SubjectInterface } from "../interfaces/subject.interface";

export class SubejectRepository{
    static subRep:SubejectRepository|null=null;
    private constructor(){}
    subjectRepository=AppDataSource.getRepository<SubjectInterface>(Subject);

    async register(subject:SubjectInterface){
        return this.subjectRepository.save(subject);
    }
    async find(){
        return this.subjectRepository.find();
    }
    async findById(id:string){
        return this.subjectRepository.findOne({where:{id}})
    }
    async update(subject:SubjectInterface,newSubject:SubjectInterface){
      const updated=this.subjectRepository.merge(subject,newSubject);
      return this.subjectRepository.save(updated);
    }

    async findByName(name:StudentInterface){
        return this.subjectRepository.find({where:name});
    }
    static getRepo(){
        if(!SubejectRepository.subRep){
            SubejectRepository.subRep=new SubejectRepository();
        }
        return SubejectRepository.subRep;
    }
}