import { Companies } from "./Companies";
import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class MailSends {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  email!: string;

  @Column()
  @Field()
  subject!: string;

  @Column()
  @Field()
  message!: string;

  @Column()
  @Field()
  date!: Date;

  @Column()
  @Field()
  createdAt!: Date;

  @Column()
  @Field()
  updatedAt!: Date;

  @ManyToOne(() => Companies, (companies) => companies.mailSends)
  @JoinColumn({ name: "companyId" })
  companyId!: Companies;
}
