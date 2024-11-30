import { Tutor } from "../../database/entities/tutor.entity";
import { Family } from "../../database/entities/family.entity";

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