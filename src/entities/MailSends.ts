import { Company } from "./Company";
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

  @ManyToOne(() => Company, (company) => company.mailSends)
  @JoinColumn({ name: "companyId" })
  companyId!: Company;
}
