import {Repository} from "typeorm";
import {dataSource} from "../tools/utils";
import {LayoutInput} from "../inputs/layoutInput";
import {Companies} from "../entities/Companies";
import {Layout} from "../entities/Layout";

export const layoutRepository: Repository<Layout> = dataSource.getRepository(Layout);
export const companiesRepository: Repository<Companies> = dataSource.getRepository(Companies);
export default {
  saveLayout: async (layoutInput: LayoutInput, id: number): Promise<Layout> => {
    const layout = await layoutRepository.findOneByOrFail({id: id});
    layout.children = layoutInput.layout;
    return await layoutRepository.save(layout);
  },
  getLayout: async (userId: number): Promise<Companies[]> => {
    return await companiesRepository.find({
      where: {
        userId: {
          id: userId,
        },
      }
    });
  },
}