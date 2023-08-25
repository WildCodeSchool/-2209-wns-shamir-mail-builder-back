import { LayoutService } from "./../services/layoutService";
import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Authorized,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { LayoutInput } from "../inputs/LayoutInput";
import { Layout } from "../entities/Layout";
import { Company } from "../entities/Company";
import { SubscriptionAccessMiddleware } from "../middleware/SubscriptionAccessMiddleware";

@Resolver(Layout)
export class LayoutResolver {
  @Authorized()
  @Mutation(() => Layout)
  async saveLayout(
    @Arg("layout") layout: LayoutInput,
    @Arg("id") id: number,
    @Arg("preview", { nullable: true }) preview: string,
    @Ctx() ctx: any
  ): Promise<Layout> {
    try {
      return await LayoutService.saveLayout(layout, preview, id, ctx.user.id);
    } catch (err: any) {
      return err.message;
    }
  }

  @Authorized()
  @Mutation(() => Layout)
  @UseMiddleware(SubscriptionAccessMiddleware)
  async newLayout(
    @Arg("layout") layout: LayoutInput,
    @Arg("companyId") companyId: number,
    @Ctx() ctx: any
  ): Promise<Layout> {
    try {
      return await LayoutService.newLayout(layout, companyId, ctx.user.id);
    } catch (err: any) {
      return err.message;
    }
  }

  @Authorized()
  @Query(() => [Company])
  async getLayouts(
    @Arg("userId") userId: number,
    @Ctx() ctx: any
  ): Promise<Company[]> {
    try {
      const layouts = await LayoutService.getLayouts(userId, ctx.user.id);
      return layouts;
    } catch (err: any) {
      return err.message;
    }
  }

  @Authorized()
  @Mutation(() => Layout)
  async deleteLayout(@Arg("id") id: number, @Ctx() ctx: any): Promise<Layout> {
    return await LayoutService.deleteLayout(id, ctx.user.id);
  }
}
