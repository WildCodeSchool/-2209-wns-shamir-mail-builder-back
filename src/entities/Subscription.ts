import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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
  subscribtionStart!: Date;

  @Field()
  @Column()
  subscribtionEnd!: Date;

  @Field()
  @Column()
  subscribtionStatus!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => User, (user) => user.subscription)
  user!: User;
}
