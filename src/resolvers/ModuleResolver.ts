import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Module } from "../entities/Module";
import moduleService from "../services/moduleService";
import { ModuleInput } from "../inputs/moduleInput";

@Resolver(Module)
export class ModuleResolver {
  @Query(() => [Module])
  async getAllModules(): Promise<Module[]> {
    return await moduleService.getAll();
  }

  @Authorized()
  @Mutation(() => Module)
  async createModule(
    @Arg("module") module: ModuleInput,
  ): Promise<Module> {
    return await moduleService.createModule(module);
  }
}

