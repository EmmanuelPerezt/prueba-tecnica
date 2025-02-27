import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!:number;
    @Column({unique: true})
    name!:string;
    @Column()
    password!:string;
}