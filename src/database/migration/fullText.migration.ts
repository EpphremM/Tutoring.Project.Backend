import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJobsSearchVectorTrigger1672930000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE jobs ADD COLUMN tsVector tsvector;
    `);
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_jobs_search_vector() RETURNS TRIGGER AS $$
      BEGIN
        NEW.tsVector :=
          setweight(to_tsvector('english', COALESCE(NEW.requiredGender, '')), 'A') || 
          setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'B') || 
          setweight(to_tsvector('english', COALESCE(NEW.educationLevel, '')), 'B') || 
          setweight(to_tsvector('english', COALESCE(NEW.experience, '')), 'B') || 
          setweight(to_tsvector('english', COALESCE(NEW.hourlyBudget, '')), 'B') || 
          setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'D') || 
          (SELECT setweight(to_tsvector('english', string_agg(grade, ' ')), 'A') FROM students WHERE job_id = NEW.id) || 
          (SELECT setweight(to_tsvector('english', string_agg(name, ' ')), 'A') FROM subjects WHERE student_id IN (SELECT id FROM students WHERE job_id = NEW.id));
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(`
      CREATE TRIGGER update_jobs_search_vector_trigger
      BEFORE INSERT OR UPDATE ON jobs
      FOR EACH ROW EXECUTE FUNCTION update_jobs_search_vector();
    `);
    await queryRunner.query(`
      UPDATE jobs SET tsVector =
       setweight(to_tsvector('english', COALESCE(requiredGender, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(title, '')), 'B') ||
          setweight(to_tsvector('english', COALESCE(educationLevel, '')), 'B') ||
          setweight(to_tsvector('english', COALESCE(experience, '')), 'B') ||
          setweight(to_tsvector('english', COALESCE(hourlyBudget, '')), 'B') ||
          setweight(to_tsvector('english', COALESCE(description, '')), 'D') ||
          (SELECT setweight(to_tsvector('english', string_agg(grade, ' ')), 'A') FROM students WHERE job_id = id) ||
          (SELECT setweight(to_tsvector('english', string_agg(name, ' ')), 'A') FROM subjects WHERE student_id IN (SELECT id FROM students WHERE job_id = id));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_jobs_search_vector_trigger ON jobs;`
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_jobs_search_vector;`
    );
    await queryRunner.query(`ALTER TABLE jobs DROP COLUMN tsVector;`);
  }
}
