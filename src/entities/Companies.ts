import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Rows } from "./Rows";
import { User } from "./User";

@ObjectType()
@Entity()
export class Companies {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  siret!: string;

  @Column()
  @Field()
  address!: string;

  @Column()
  @Field()
  phone!: string;

  @Column()
  @Field()
  email!: string;

  @Column()
  @Field()
  website!: string;

  @Column()
  @Field()
  facebook!: string;

  @Column()
  @Field()
  instagram!: string;

  @Column()
  @Field()
  twitter!: string;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field()
  logo!: string;

  @Column()
  @Field()
  subscribed!: boolean;

  @Column()
  @Field()
  createdAt!: Date;

  @Column()
  @Field()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.companies)
  @JoinColumn({ name: "userId" })
  userId!: User;
}
