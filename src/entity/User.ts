import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { TaskModel } from "./task"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(()=> TaskModel,(task)=>task.user)
    tasks: TaskModel[]
}


