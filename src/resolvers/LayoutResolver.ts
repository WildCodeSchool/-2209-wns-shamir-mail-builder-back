import { Arg, Mutation, Query, Resolver, Authorized } from "type-graphql";
import { LayoutInput } from "../inputs/LayoutInput";
import layoutService from "../services/layoutService";

import { Layout } from "../entities/Layout";
import { Company } from "../entities/Company";

@Resolver(Layout)
export class LayoutResolver {
  @Authorized()
  @Mutation(() => Layout)
  async saveLayout(
    @Arg("layout") layout: LayoutInput,
    @Arg("id") id: number,
    @Arg("preview", { nullable: true }) preview: string,
  ): Promise<Layout> {
    return await layoutService.saveLayout(layout, preview, id);
  }

  @Authorized()
  @Mutation(() => Layout)
  async newLayout(
    @Arg("layout") layout: LayoutInput,
    @Arg("companyId") companyId: number
  ) : Promise<Layout> {
    return await layoutService.newLayout(layout, companyId);
  }

  @Authorized()
  @Query(() => [Company])
  async getLayouts(@Arg("userId") userId: number): Promise<Company[]> {
    try {
      const layouts = await layoutService.getLayouts(userId);
      return layouts;
    } catch (err: any) {
      return err.message;
    }
  }
}

