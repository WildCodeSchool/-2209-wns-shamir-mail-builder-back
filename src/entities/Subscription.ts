import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Subscription {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  info!: string;

  @Field()
  @Column()
  price!: number;

  @Field()
  @Column()
  subscribtionStart: Date = new Date();

  @Field()
  @Column()
  subscribtionEnd!: Date;

  @Field()
  @Column()
  subscribtionStatus!: string;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

  @OneToOne(() => User, (user) => user.subscriptionId)
  user!: User;
}
