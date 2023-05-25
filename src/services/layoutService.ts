import {Repository} from "typeorm";
import {dataSource} from "../tools/utils";
import {LayoutInput} from "../inputs/layoutInput";
import {Companies} from "../entities/Companies";
import {Layout} from "../entities/Layout";
import { userRepository } from "./userService";

export const layoutRepository: Repository<Layout> = dataSource.getRepository(Layout);
export const companiesRepository: Repository<Companies> = dataSource.getRepository(Companies);
export default {
  saveLayout: async (layoutInput: LayoutInput, preview: string, id: number): Promise<Layout> => {
    const layout = await layoutRepository.findOneByOrFail({id: id});
    layout.children = layoutInput.layout;
    if (preview) {
      layout.preview = preview;
    }
    return await layoutRepository.save(layout);
  },
  getLayout: async (userId: number): Promise<Companies[]> => {
    const user = await userRepository.findOneByOrFail({ id: userId })
    return await companiesRepository.find({
      where: {
        userId: user,
      },
      relations: {
        layouts: true,
      }
    });
  },
  newLayout: async (layout: LayoutInput, companyId: number): Promise<Layout> => {
    const company = await companiesRepository.findOneByOrFail({id: companyId});
    if (company) {
      const newLayout = new Layout();
      newLayout.name = layout.layout.name;
      newLayout.description = layout.layout.description as string;
      newLayout.companyId = company;
      newLayout.children = [];
      newLayout.preview = "";
      newLayout.createdAt = new Date();
      newLayout.updatedAt = new Date();
      return await layoutRepository.save(newLayout);
    }
    return new Layout();
  }
}