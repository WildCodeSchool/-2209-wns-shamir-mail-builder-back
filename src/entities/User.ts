import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Subscription } from "./Subscription";

@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column()
    email!: string;

    @Field()
    @Column()
    userName!: string;

    @Column()
    hashedPassword!: string;

    @Field()
    @Column({nullable: true})
    phoneNumber!: string;

    @Column({default: new Date()})
    createdAt!: Date;

    @Column({default: new Date()})
    updatedAt!: Date;

    @Field()
    @Column({nullable: true, default: 0})
    @OneToOne(() => Subscription, (subscription) => subscription.userId)
    subscriptionId!: number;
}