import { AppDataSource } from "../data.source";
import { Student } from '../entities/student.entity';
import { StudentInterface } from "../interfaces/student.interface";

export class StudentRepository{
    studentRepository=AppDataSource.getRepository<StudentInterface>(Student);
    static studentRepo:StudentRepository|null=null;
    private constructor(){}
    async register(student:StudentInterface){
        return this.studentRepository.save(student);
    }
    async find(){
        return this.studentRepository.find();
    }
    async findById(id:string){
        return this.studentRepository.findOne({where:{id}});
    }
    async update(student:StudentInterface,newStudnet:Partial<StudentInterface>){
        const update:StudentInterface=this.studentRepository.merge(student,newStudnet);
        return this.studentRepository.save(update);
    }
    static getRepo(){
        if(!StudentRepository.studentRepo){
            StudentRepository.studentRepo=new StudentRepository();
        }
        return StudentRepository.studentRepo;
    }
}