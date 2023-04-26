import {Arg, Mutation} from "type-graphql";
import {Companies} from "../entities/Companies";
import {CompaniesInput} from "../inputs/companiesInput";
import companiesService from "../services/companiesService";

export class CompaniesResolver {
  @Mutation(() => Companies)
  async createCompany(
    @Arg("userEmail") userEmail: string,
    @Arg("company") company: CompaniesInput,
  ): Promise<Companies> {
    return await companiesService.createCompany(company, userEmail);
  }
}

