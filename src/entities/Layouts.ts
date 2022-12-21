import { TemplateEmails } from "./TemplateEmails";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Rows } from "./Rows";

@ObjectType()
@Entity()
export class Layouts {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  description!: string;

  @Column({ type: "json" })
  @Field()
  props!: string;

  @Column()
  @Field()
  createdAt!: Date;

  @Column()
  @Field()
  updatedAt!: Date;

  @ManyToOne(() => TemplateEmails, (templateEmails) => templateEmails.layouts)
  templateEmailId!: TemplateEmails;

  @OneToMany(() => Rows, (rows) => rows.layoutId)
  rows!: Rows[];
}
