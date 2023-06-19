import {Field, InputType, ObjectType} from "type-graphql";

@InputType()
export class CompanyInput {
  @Field()
  name!: string;

  @Field()
  siret!: string;

  @Field()
  address!: string;

  @Field()
  phone!: string;

  @Field()
  email!: string;

  @Field()
  website!: string;

  @Field()
  logo!: string;

  @Field()
  description!: string;

  @Field()
  facebook!: string;

  @Field()
  twitter!: string;

  @Field()
  instagram!: string;

  @Field()
  userId!: string;

  @Field()
  subscribed!: boolean;
}