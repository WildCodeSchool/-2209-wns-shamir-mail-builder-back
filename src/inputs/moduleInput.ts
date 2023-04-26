import { InputType, Field } from "type-graphql";
import {PreviewObject} from "../entities/Module";

@InputType()
export class ModuleInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  preview!: string;

  @Field(() => PreviewObject)
  render!: typeof PreviewObject;

  @Field(() => String)
  userId!: string;
}