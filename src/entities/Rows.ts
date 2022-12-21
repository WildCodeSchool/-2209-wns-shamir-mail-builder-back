import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Layouts } from "./Layouts";
import { Columns } from "./Columns";

@ObjectType()
@Entity()
export class Rows {
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

  @ManyToOne(() => Layouts, (layouts) => layouts.rows)
  layoutId!: Layouts;

  @OneToMany(() => Columns, (columns) => columns.rowId)
  columns!: Columns[];
}
