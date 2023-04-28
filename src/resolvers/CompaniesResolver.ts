import {Arg, Mutation, Query} from "type-graphql";
import {Companies} from "../entities/Companies";
import {CompaniesInput} from "../inputs/companiesInput";
import companiesService from "../services/companiesService";
import userService from "../services/userService";

export class CompaniesResolver {
  @Mutation(() => Companies)
  async createCompany(
    @Arg("userEmail") userEmail: string,
    @Arg("company") company: CompaniesInput,
  ): Promise<Companies> {
    return await companiesService.createCompany(company, userEmail);
  }

  @Query(() => [Companies])
  async getUserLayout(
    @Arg('userId') userId: number,
  ): Promise<Companies[]> {
    return await userService.getUserLayout(userId);
  }
}

