import { MiddlewareFn, NextFn, ResolverData } from "type-graphql";
import { userRepository } from "../services/userService";

export const SubscriptionAccessMiddleware: MiddlewareFn = async (
  { context }: ResolverData<any>,
  next: NextFn
) => {
  const { user } = context;
  const userId = user.id;
  if (userId) {
    const userInfo = await userRepository.find({
      where: {
        id: userId,
      },
      relations: {
        companyId: true,
        subscriptionId: true,
      },
    });

    if (!userInfo[0].companyId || !userInfo[0].companyId.length) {
      throw new Error(
        "Vous devez créer une entreprise avant de créer un layout"
      );
    }

    const length = userInfo[0].companyId![0].layouts.length;

    if (userInfo) {
      const allowedLayouts =
        userInfo[0].subscriptionId !== null &&
        userInfo[0].subscriptionId!.subscriptionEnd > new Date()
          ? Infinity
          : 1;
      if (length >= allowedLayouts) {
        throw new Error(
          "Limite de layouts atteinte, veuillez souscrire à un abonnement"
        );
      }
    }
  }
  return next();
};
