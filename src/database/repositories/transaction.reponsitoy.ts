import { AppDataSource } from "../data.source";
import { Transaction } from "../entities/transaction.entity";
import { TransactionInterface } from "../interfaces/transaction.interface";

export class TransactionRepository{
    transactionRepository=AppDataSource.getRepository<TransactionInterface>(Transaction);
    async register(transaction:TransactionInterface){
        return this.transactionRepository.save(transaction);
    }
    async find(){
        return this.transactionRepository.find();
    }
    async findById(id:string){
        return this.transactionRepository.find({where:{id}});
    }
    async update(transaction:TransactionInterface,newTransaction:TransactionInterface){
        const updated=this.transactionRepository.merge(transaction,newTransaction);
        return this.transactionRepository.save(updated);
    }
}