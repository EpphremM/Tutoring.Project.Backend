import { Tutor } from "../../database/entities/tutor.entity";
import { Family } from "../../database/entities/family.entity";

export interface TransactionInterface{
    id:string;
    first_name:string;
    last_name:string;
    phone_number:string;
    email:string;
    amount:Number;
    callback_url:string;
    tx_ref:string;
    return_url:string;
    created_at:Date;
    family_id:string,
    tutor_id:string,
    status:string;
    tutor:Tutor,
    family:Family
}