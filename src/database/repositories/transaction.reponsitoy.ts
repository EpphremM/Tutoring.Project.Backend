import { AppDataSource } from "../data.source";
import { Transaction } from "../entities/transaction.entity";
import { TransactionInterface } from "../interfaces/transaction.interface";
import { promises } from "dns";

export class TransactionRepository {
  transactionRepository =
    AppDataSource.getRepository<TransactionInterface>(Transaction);
  async register(
    transaction: TransactionInterface
  ): Promise<TransactionInterface> {
    return this.transactionRepository.save(transaction);
  }
  async find() {
      return  await this.transactionRepository
    .createQueryBuilder("transaction")
    .leftJoinAndSelect("transaction.tutor", "tutor")
    .leftJoinAndSelect("transaction.family", "families")
    .getMany();
  }
  async findById(id: string) {
    return this.transactionRepository.findOneBy({ id: id });
  }
  async update(
    transaction: TransactionInterface,
    newTransaction: Partial<TransactionInterface>
  ) {
    const updated = this.transactionRepository.merge(
      transaction,
      newTransaction
    );
    return this.transactionRepository.save(updated);
  }
}
