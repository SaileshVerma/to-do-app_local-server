import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()
export class TaskModel {

    @PrimaryGeneratedColumn()
    tid: number

    @Column()
    taskDetail: string

    @Column({default:false})
    isCompleted: boolean

    @ManyToOne(()=>User,(user)=>user.tasks)
    user:User


}