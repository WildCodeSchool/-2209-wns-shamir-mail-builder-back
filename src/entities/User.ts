import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "./Company";
import { Subscription } from "./Subscription";
import { Module } from "./Module";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  username!: string;

  @Column()
  hashedPassword!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column({ nullable: true })
  @Field()
  phone!: string;

  @CreateDateColumn()
  @Field()
  createdAt?: Date = new Date();

  @UpdateDateColumn()
  updatedAt?: Date = new Date();

  @Field(() => Subscription, { nullable: true })
  @OneToOne(() => Subscription, (subscription) => subscription.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "subscriptionId" })
  subscriptionId?: Subscription;

  @Field(() => [Company], { nullable: true })
  @OneToMany(() => Company, (company) => company.userId, {
    cascade: true,
  })
  companyId?: Company[];

  @Field(() => [Module], { nullable: true })
  @OneToMany(() => Module, (module) => module.user, { cascade: true })
  modules?: Module[];
}
