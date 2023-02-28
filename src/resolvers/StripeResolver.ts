import { Query, Resolver, Authorized } from "type-graphql";
import * as dotenv from "dotenv";
import authService from "../services/authService";
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

@Resolver()
export class StripeResolver {
    @Authorized()
    @Query(() => String)
    async createSubscriptionSession(): Promise<string> {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1MI7vgK4DNgL6ru3fCuO83W1',
                    quantity: 1,
                }
            ],
            mode: 'subscription',
            success_url: process.env.FRONTEND_DOMAIN + '/sub/success',
            cancel_url: process.env.FRONTEND_DOMAIN + '/sub/cancel',
        })
        return JSON.stringify({
            url: session.url
        })
    }

}