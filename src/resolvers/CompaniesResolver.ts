import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Companies } from "../entities/Companies";
import { CompaniesInput } from "../inputs/companiesInput";
import companiesService from "../services/companiesService";

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

  @Query(() => [Companies])
  async getUserCompanies()
  : Promise<Companies[]> {
    try {
      const companies = await companiesService.getUserCompanies();
      console.log('COMPANIES', companies)
      return companies ? companies : [];
    } catch (err: any) {
      //throw new Error("Erreur en recherchant les sociétés liées à l'utilisateur");
      return err.message;
    }
  }
}

