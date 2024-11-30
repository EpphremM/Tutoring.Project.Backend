import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJobsSearchVectorTrigger1672930000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_jobs_search_vector() RETURNS TRIGGER AS $$
      BEGIN
      NEW.tsvector := 
      setweight(to_tsvector('simple', COALESCE(NEW.required_gender::TEXT, 'both')), 'A') ||
      setweight(to_tsvector('english', COALESCE(NEW.education_level::TEXT, '')), 'B') ||
      setweight(to_tsvector('english', COALESCE(NEW.experience::TEXT, '')), 'B') ||
      setweight(to_tsvector('english', COALESCE(NEW.hourly_budget::varchar, '1000')), 'C') ||
          setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'B') || 
          setweight(to_tsvector('english', COALESCE(NEW.responsibility, '')), 'D') || 
          COALESCE(
            (SELECT setweight(to_tsvector('english', string_agg(grade, '')), 'A') 
             FROM students WHERE job_id = NEW.id), 
            '') ||
          COALESCE(
            (SELECT setweight(to_tsvector('english', string_agg(s.name, '')), 'B') 
             FROM subjects s
             JOIN student_subject ss ON ss.subject_id = s.id
             JOIN students st ON ss.student_id = st.id
             WHERE st.job_id = NEW.id), 
            '');
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(`
      CREATE TRIGGER update_jobs_search_vector_trigger
      BEFORE INSERT OR UPDATE ON jobs
      FOR EACH ROW EXECUTE FUNCTION update_jobs_search_vector();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS update_jobs_search_vector_trigger ON jobs;
    `);

    await queryRunner.query(`
      DROP FUNCTION IF EXISTS update_jobs_search_vector;
    `);

    await queryRunner.query(`
      ALTER TABLE jobs DROP COLUMN tsvector;
    `);
  }
}
