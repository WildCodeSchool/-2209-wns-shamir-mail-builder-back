import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {LayoutInput} from "../inputs/layoutInput";
import layoutService from "../services/layoutService";

import {Layout} from "../entities/Layout";
import {Companies} from "../entities/Companies";

@Resolver(Layout)
export class LayoutResolver {
  @Mutation(() => Layout)
  async saveLayout(
    @Arg("layout") layout: LayoutInput,
    @Arg("id") id: number,
    @Arg("preview", { nullable: true }) preview: string,
  ): Promise<Layout> {
    return await layoutService.saveLayout(layout, preview, id);
  }

  @Mutation(() => Layout)
  async newLayout(
    @Arg("layout") layout: LayoutInput,
    @Arg("companyId") companyId: number
  ) : Promise<Layout> {
    return await layoutService.newLayout(layout, companyId);
  }

  @Query(() => [Companies])
  async getLayout(@Arg("userId") userId: number): Promise<Companies[]> {
    try {
      const layouts = await layoutService.getLayout(userId);
      console.log('LAYOUTS', layouts);
      return layouts;
    } catch (err: any) {
      return err.message;
    }
  }
}

