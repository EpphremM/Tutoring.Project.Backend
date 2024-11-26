import { AppDataSource } from "../data.source";
import { Subject } from "../entities/subject.entity";
import { StudentInterface } from "../interfaces/student.interface";
import { SubjectInterface } from "../interfaces/subject.interface";

export class SubjectRepository{
    static subRep:SubjectRepository|null=null;
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

    async findByName(name: string, student_id: StudentInterface) {
        return this.subjectRepository.find({
            where: {
                name: name
            },
        });
    }
    async Delete(id:string){
        return await this.subjectRepository.delete({id})
    }
    static getRepo(){
        if(!SubjectRepository.subRep){
            SubjectRepository.subRep=new SubjectRepository();
        }
        return SubjectRepository.subRep;
    }
}