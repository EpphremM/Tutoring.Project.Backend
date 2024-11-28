import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  Validate,
  IsArray,
  ArrayMinSize,
} from "class-validator";
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
  @IsOptional() @IsString() educationLevel?: string;
  @IsOptional()@IsString()students?: string;
  @IsOptional()@IsString()subjects?: string;
}
