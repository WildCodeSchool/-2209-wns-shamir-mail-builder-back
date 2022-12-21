import { User } from "./User";
import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Layouts } from "./Layouts";

@ObjectType()
@Entity()
export class TemplateEmails {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  subject!: string;

  @Column()
  @Field()
  view_html!: string;

  @Column({ type: "json" })
  @Field()
  props!: string;

  @Column()
  @Field()
  createdAt!: Date;

  @Column()
  @Field()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.templateEmails)
  userId!: User;

  @OneToMany(() => Layouts, (layouts) => layouts.templateEmailId)
  layouts!: Layouts[];
}
