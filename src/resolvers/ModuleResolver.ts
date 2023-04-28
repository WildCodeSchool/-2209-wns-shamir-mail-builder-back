import {Arg, Mutation, Query} from "type-graphql";
import {Module} from "../entities/Module";
import moduleService from "../services/moduleService";
import {ModuleInput} from "../inputs/moduleInput";

export class ModuleResolver {
  @Query(() => [Module])
  async getAllModules(): Promise<Module[]> {
    return await moduleService.getAll();
  }

  @Mutation(() => Module)
  async createModule(
    @Arg("module") module: ModuleInput,
  ): Promise<Module> {
    return await moduleService.createModule(module);
  }

  @Mutation(() => Module)
  async removeModule(
    @Arg("id") id: number,
  ): Promise<Module|{id: number}> {
    return await moduleService.removeModule(id);
  }
}

