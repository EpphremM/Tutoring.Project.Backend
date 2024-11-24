import { Decimal128 } from "typeorm";
import { FamilyInterface } from "./family.interface";
import { Tutor } from "../entities/tutor.entity";
import { Family } from "../entities/family.entity";

export interface TransactionInterface{
    id:string;
    firstName:string;
    lastName:string;
    phoneNumber:string;
    email:string;
    amount:Number;
    callbackUrl:string;
    tx_ref:string;
    returnUrl:string;
    createdAt:Date;
    family_id:string,
    tutor_id:string,
    tutor:Tutor,
    family:Family
}