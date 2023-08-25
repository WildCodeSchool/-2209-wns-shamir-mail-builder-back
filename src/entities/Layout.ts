import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Company } from "./Company";
import { GraphQLScalarType, Kind } from "graphql";

export const ObjectIdScalar = new GraphQLScalarType({
  name: "LayoutJSON",
  description: "Scalar type for layout JSON",
  parseValue(value) {
    return value;
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  },
});

@Entity()
@ObjectType()
export class Layout {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => ObjectIdScalar)
  @Column({ type: "jsonb", nullable: true })
  children!: object;

  @Field()
  @Column({ nullable: true })
  preview!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;

  @ManyToOne(() => Company, (company) => company.layouts)
  @JoinColumn({ name: "companyId" })
  companyId!: Company;
}
