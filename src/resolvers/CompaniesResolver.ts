import { Arg, Mutation, Query, Authorized, Resolver } from "type-graphql";
import { Companies } from "../entities/Companies";
import { CompaniesInput } from "../inputs/companiesInput";
import companiesService from "../services/companiesService";
import userService from "../services/userService";

@Resolver(Companies)
export class CompaniesResolver {

  @Authorized()
  @Mutation(() => Companies)
  async createCompany(
    @Arg("userEmail") userEmail: string,
    @Arg("company") company: CompaniesInput,
  ): Promise<Companies> {
    return await companiesService.createCompany(company, userEmail);
  }

  @Authorized()
  @Query(() => [Companies])
  async getUserLayout(
    @Arg('userId') userId: number,
  ): Promise<Companies[]> {
    return await userService.getUserLayout(userId);
  }

  @Authorized()
  @Query(() => [Companies])
  async getUserCompanies()
  : Promise<Companies[]> {
    return await companiesService.getUserCompanies();
  }
}

