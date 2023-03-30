import { Repository } from "typeorm";
import { TemplateEmails } from "../entities/TemplateEmails";
import { dataSource } from "../tools/utils";
import { userRepository } from "./userService";


const templateEmailsRepository: Repository<TemplateEmails> = dataSource.getRepository(TemplateEmails);

export default {
    getAllTemplates: async (): Promise<TemplateEmails[]> => {
        return await templateEmailsRepository.find();
    },

    getById: async (templateId: number): Promise<TemplateEmails> => {
        return await templateEmailsRepository.findOneByOrFail({ id: templateId });
    },

    getUserTemplates: async (email: string): Promise<TemplateEmails[]> => {
        const user = await userRepository.findOneByOrFail({ email });
        return await templateEmailsRepository.findBy({ userId: user });
    },
}