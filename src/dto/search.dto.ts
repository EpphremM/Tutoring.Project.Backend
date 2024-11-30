import { IsOptional, IsString } from "class-validator";

export class searchDto{
    @IsString() @IsOptional() searchData?:string;
}