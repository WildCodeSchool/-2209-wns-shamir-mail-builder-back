import { Repository } from "typeorm";
import { Subscription } from "../entities/Subscription";
import { dataSource } from "../tools/utils";

const subscriptionRepository: Repository<Subscription> = dataSource.getRepository(Subscription);


export default {
    getAllSubs: async (): Promise<Subscription[]> => {
        return await subscriptionRepository.find();
    },

    getById: async (subId: number): Promise<Subscription> => {
        return await subscriptionRepository.findOneByOrFail({ id: subId });
    },
}