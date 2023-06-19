import {CompanyInput} from "../inputs/CompanyInput";
import {Company} from "../entities/Company";
import userService, { userRepository } from "./userService";
import {companiesRepository} from "./layoutService";
import {User} from "../entities/User";

export default {
  createCompany: async (company: CompanyInput, userEmail: string): Promise<Company> => {
    const user = await userService.getByEmail(userEmail);
    if (user) {
      const newCompany = new Company();
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
    return new Company();
  },

  getUserCompanies: async (userId: number): Promise<Company[]> => {
    return await companiesRepository.createQueryBuilder('company')
    .leftJoinAndSelect('company.userId', 'user')
    .where('company.userId = :userId', { userId })
    .getMany();
  },

  getAllCompanies: async (): Promise<Company[]> => {
    return await companiesRepository.find();
  },

  getUserLayouts: async (userId: number): Promise<Company[]> => {
    const user = await userRepository.findOneByOrFail({ id: userId });
    return await companiesRepository.find({
        where: {
            userId: {
                id: user.id,
            }
        },
    });
},
  
}
