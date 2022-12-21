import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Subscription {

    @Field()
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ default: new Date()})
    createdAt!: Date;

    @Field()
    @OneToOne(() => User, (user) => user.subscriptionId, { eager: true, cascade: true})
    userId!: number;
}