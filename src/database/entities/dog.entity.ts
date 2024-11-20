import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DogInterface } from "../interfaces/dog.interface";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

@Entity("dog")
export class Dog implements DogInterface {
    @PrimaryGeneratedColumn()
    id: String

    @Column({type:"varchar"})
    name: String
}