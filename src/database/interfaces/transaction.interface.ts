import { Decimal128 } from "typeorm";

export interface TransactionInterface{
    id:string;
    amount:Number;
    tx_ref:string;
    email:string;
    phoneNumber:string;
    firstName:string;
    lastName:string;
    callbackUrl:string;
    returnUrl:string;
    createAt:Date;
}