
import { IsOptional, IsString, IsNumber, IsDateString} from 'class-validator';
export class JobFilterDto {
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsNumber() minDuration?: number;
  @IsOptional() @IsNumber() maxDuration?: number;
  @IsOptional() @IsNumber() minHourlyBudget?: number;
  @IsOptional() @IsNumber() maxHourlyBudget?: number;
  @IsOptional() @IsNumber() weeklyFrequency?: number;
  @IsOptional() @IsString() workPeriod?: string;
  @IsOptional() @IsDateString() startingDate?: Date;
  @IsOptional() @IsString() requiredGender?: string;
  @IsOptional() @IsString() experience?: string;
  @IsOptional() @IsString() responsibility?: string;
  @IsOptional() @IsString() educationLevel?: string;
  @IsOptional() @IsDateString() createdAfter?: Date;
  @IsOptional() @IsDateString() createdBefore?: Date;
  @IsOptional() @IsString() student?:string;
  @IsOptional() @IsString() subeject?:string;
}
