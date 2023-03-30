import { Repository } from "typeorm";
import { Companies } from "../entities/Companies";
import { dataSource } from "../tools/utils";
import { userRepository } from "./userService";

const companiesRepository: Repository<Companies> = dataSource.getRepository(Companies);

export default {
    getAllCompanies: async (): Promise<Companies[]> => {
        return await companiesRepository.find();
    },

    getById: async (companyId: number): Promise<Companies> => {
        return await companiesRepository.findOneByOrFail({ id: companyId });
    },

    getUserCompanies: async (email: string): Promise<Companies[]> => {
        const user = await userRepository.findOneByOrFail({ email });
        return await companiesRepository.findBy({ userId: user });
    },
}