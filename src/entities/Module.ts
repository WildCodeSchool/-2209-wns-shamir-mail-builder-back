import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GraphQLScalarType, Kind } from "graphql";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

export const PreviewObject = new GraphQLScalarType({
  name: "ModulePreview",
  description: "Scalar type for Module Preview JSON",
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

@ObjectType()
@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  preview!: string;

  @Column({ type: "jsonb", nullable: true, default: [] })
  @Field(() => PreviewObject)
  render!: object;

  @ManyToOne(() => User, (user) => user.modules)
  @JoinColumn({ name: "userId" })
  user!: User;
}
