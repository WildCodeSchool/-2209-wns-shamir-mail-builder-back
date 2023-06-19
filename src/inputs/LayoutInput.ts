import { InputType, Field } from "type-graphql";
import {ObjectIdScalar} from "../entities/Layout";

@InputType()
export class LayoutInput {
  @Field(() => ObjectIdScalar)
  layout!: typeof ObjectIdScalar;
}