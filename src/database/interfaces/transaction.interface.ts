import { Decimal128 } from "typeorm";

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
}