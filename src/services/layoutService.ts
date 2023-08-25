import { DeleteResult, Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { LayoutInput } from "../inputs/LayoutInput";
import { Company } from "../entities/Company";
import { Layout } from "../entities/Layout";
import { userRepository } from "./userService";

export const layoutRepository: Repository<Layout> =
  dataSource.getRepository(Layout);
export const companiesRepository: Repository<Company> =
  dataSource.getRepository(Company);

export class LayoutService {
  static async saveLayout(
    layoutInput: LayoutInput,
    preview: string,
    id: number,
    userConnectedId: number
  ): Promise<Layout> {
    const layout = await layoutRepository.find({
      where: {
        id: id,
      },
      relations: {
        companyId: true,
      },
    });
    console.log(layout);
    const company = await companiesRepository.find({
      where: {
        id: layout[0].companyId!.id,
      },
      relations: {
        userId: true,
      },
    });
    if (company.length && company[0].userId!.id === userConnectedId) {
      layout[0].children = layoutInput.layout;
      if (preview) {
        layout[0].preview = preview;
      }
      return await layoutRepository.save(layout[0]);
    } else {
      throw new Error("You are not authorize to make this action");
    }
  }

  static async getLayouts(
    userId: number,
    userConnectedId: number
  ): Promise<Company[]> {
    if (userId !== userConnectedId) {
      throw new Error("You are not authorized to perform this action");
    }

    const user = await userRepository.findOneByOrFail({ id: userId });
    return await companiesRepository.find({
      where: {
        userId: user,
      },
      relations: {
        layouts: true,
      },
    });
  }

  static async newLayout(
    layout: LayoutInput,
    companyId: number,
    userConnectedId: number
  ): Promise<Layout> {
    const userConnected = await userRepository.findOneByOrFail({
      id: userConnectedId,
    });
    const company = await companiesRepository.find({
      where: {
        id: companyId,
      },
      relations: {
        userId: true,
      },
    });
    if (company && company[0].userId!.id === userConnected.id) {
      const newLayout = new Layout();
      newLayout.name = layout.layout.name;
      newLayout.description = layout.layout.description as string;
      newLayout.companyId = company[0];
      newLayout.children = [];
      newLayout.preview = "";
      newLayout.createdAt = new Date();
      newLayout.updatedAt = new Date();
      return await layoutRepository.save(newLayout);
    } else {
      throw new Error("You are not authorize to make this action");
    }
  }

  static async deleteLayout(
    id: number,
    userConnectedId: number
  ): Promise<Layout> {
    const userConnected = await userRepository.findOneByOrFail({
      id: userConnectedId,
    });
    const layout = await layoutRepository.find({
      where: {
        id: id,
      },
      relations: {
        companyId: true,
      },
    });
    const company = await companiesRepository.find({
      where: {
        id: layout[0].companyId!.id,
      },
      relations: {
        userId: true,
      },
    });
    if (company.length && company[0].userId!.id === userConnected.id) {
      const layoutRemoved = await layoutRepository.remove(layout);
      return layoutRemoved[0];
    }
    throw new Error("You are not authorize to make this action");
  }
}
