import { AppDataSource } from "../data.source";
import { Student } from "../entities/student.entity";
import { StudentInterface } from "../interfaces/student.interface";
import { SubjectInterface } from "../interfaces/subject.interface";

export class StudentRepository {
  studentRepository = AppDataSource.getRepository<StudentInterface>(Student);
  static studentRepo: StudentRepository | null = null;
  private constructor() {}
  async register(student: StudentInterface) {
    return this.studentRepository.save(student);
  }
  async find() {
    // return this.studentRepository.find();
    return this.studentRepository
      .createQueryBuilder("students")
      .leftJoinAndSelect("students.subjects", "subjects")
      .getMany();
  }
  async findById(id: string) {
    return this.studentRepository.findOne({
      where: { id },
      relations: ["subjects"],
    });
  }
  async update(
    student: StudentInterface,
    newStudnet: Partial<StudentInterface>
  ) {
    const update: StudentInterface = this.studentRepository.merge(
      student,
      newStudnet
    );
    return this.studentRepository.save(update);
  }
  async addSubject(student: StudentInterface, subject: SubjectInterface) {
    student.subjects
      ? student.subjects.push(subject)
      : (student.subjects = [subject]);
    return this, this.studentRepository.save(student);
  }
  static getRepo() {
    if (!StudentRepository.studentRepo) {
      StudentRepository.studentRepo = new StudentRepository();
    }
    return StudentRepository.studentRepo;
  }
}
