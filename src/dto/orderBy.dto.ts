import { IsNumber, IsOptional, IsString } from "class-validator";

export class OrderByDto{
  @IsOptional() @IsString() sortFields?:string;
  @IsOptional() @IsString() sortDirection?:string;

}