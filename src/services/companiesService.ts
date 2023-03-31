import {CompaniesInput} from "../inputs/companiesInput";
import {Companies} from "../entities/Companies";
import userService from "./userService";
import {companiesRepository} from "./layoutService";

export default {
  createCompany: async (company: CompaniesInput): Promise<Companies> => {
    const user = await userService.getByEmail('joel.miller@gmail.com');
    const newCompany = new Companies();
    newCompany.name = company.name;
    newCompany.siret = company.siret;
    newCompany.address = company.address;
    newCompany.phone = company.phone;
    newCompany.email = company.email;
    newCompany.website = company.website;
    newCompany.logo = company.logo;
    newCompany.description = company.description;
    newCompany.facebook = company.facebook;
    newCompany.twitter = company.twitter;
    newCompany.instagram = company.instagram;
    newCompany.userId = user;
    newCompany.subscribed = company.subscribed;
    newCompany.createdAt = new Date();
    newCompany.updatedAt = new Date();
    return await companiesRepository.save(newCompany);
  }
}