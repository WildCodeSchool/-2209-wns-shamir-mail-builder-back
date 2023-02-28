import { InputType, Field } from "type-graphql";

@InputType()
export class SubscriptionInput {
    id!: number

    @Field()
    name!: string

    @Field()
    info!: string

    @Field()
    price!: number

    @Field()
    subscriptionStart!: Date

    @Field()
    subscriptionEnd!: Date

    @Field()
    subscriptionStatus!: string
    
    createdAt!: Date

    updatedAt!: Date
}