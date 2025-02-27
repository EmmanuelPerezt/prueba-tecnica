import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Tracking {
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    user!: string;
    @Column()
    fileName!: string;
}