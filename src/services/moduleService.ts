import {Module} from "../entities/Module";
import {Repository} from "typeorm";
import {dataSource} from "../tools/utils";
import {ModuleInput} from "../inputs/moduleInput";

export const moduleRepository: Repository<Module> = dataSource.getRepository(Module);

export default {
  getAll: async (): Promise<Module[]> => {
    return await moduleRepository.find();
  },
  createModule: async (module: ModuleInput): Promise<Module> => {
    return await moduleRepository.save(module);
  }
}