import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Subscription } from "../entities/Subscription";
import subscriptionService from "../services/subscriptionService";

@Resolver(Subscription)
export class SubscriptionResolver {
    @Query(() => [Subscription])
    async getSubs() {
        return await subscriptionService.getAllSubs();
    }

    @Query(() => Subscription)
    async getOneById(
        @Arg("subId") subId: number,
    ): Promise<Subscription> {
        return await subscriptionService.getById(subId);
    }
}
