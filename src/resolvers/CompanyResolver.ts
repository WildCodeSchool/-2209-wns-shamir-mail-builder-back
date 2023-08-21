import { Arg, Mutation, Query, Authorized, Resolver } from "type-graphql";
import { Company } from "../entities/Company";
import { CompanyInput } from "../inputs/CompanyInput";
import { CompanyService } from "../services/companyService";

@Resolver(Company)
export class CompanyResolver {
  @Authorized()
  @Mutation(() => Company)
  async createCompany(
    @Arg("userEmail") userEmail: string,
    @Arg("company") company: CompanyInput
  ): Promise<Company> {
    return await CompanyService.createCompany(company, userEmail);
  }

  @Authorized()
  @Query(() => [Company])
  async getUserCompanies(@Arg("userId") userId: number): Promise<Company[]> {
    return await CompanyService.getUserCompanies(userId);
  }

  @Query(() => [Company])
  async getAllCompanies(): Promise<Company[]> {
    return await CompanyService.getAllCompanies();
  }

  @Authorized()
  @Query(() => [Company])
  async getCompaniesWithLayouts(
    @Arg("userId") userId: number
  ): Promise<Company[]> {
    return await CompanyService.getUserLayouts(userId);
  }
}
