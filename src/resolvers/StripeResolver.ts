import { Query, Resolver, Authorized } from "type-graphql";
import * as dotenv from "dotenv";
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
          price: "price_1NiN3fJQgCohi87LWnbUCaMa",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url:
        process.env.NODE_ENV === "production"
          ? process.env.FRONTEND_DOMAIN_PROD
          : process.env.FRONTEND_DOMAIN + "/sub/success",
      cancel_url:
        process.env.NODE_ENV === "production"
          ? process.env.FRONTEND_DOMAIN_PROD
          : process.env.FRONTEND_DOMAIN + "/sub/cancel",
    });
    return JSON.stringify({
      url: session.url,
    });
  }
}
