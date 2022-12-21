import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Rows } from "./Rows";

@ObjectType()
@Entity()
export class Columns {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  type!: string;

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

  @ManyToOne(() => Rows, (rows) => rows.columns)
  @JoinColumn({ name: "rowId" })
  rowId!: Rows;
}
