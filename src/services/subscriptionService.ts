import { Repository } from "typeorm";
import { Subscription } from "../entities/Subscription";
import { dataSource } from "../tools/utils";

const subscriptionRepository: Repository<Subscription> =
  dataSource.getRepository(Subscription);

export class SubscriptionService {
  static async getAllSubs(): Promise<Subscription[]> {
    return await subscriptionRepository.find();
  }

  static async getById(subId: number): Promise<Subscription> {
    return await subscriptionRepository.findOneByOrFail({ id: subId });
  }
}
