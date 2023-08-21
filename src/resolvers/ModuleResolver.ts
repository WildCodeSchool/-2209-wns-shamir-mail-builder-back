import { Arg, Mutation, Query, Authorized, Resolver } from "type-graphql";
import { Module } from "../entities/Module";
import { ModuleService } from "../services/moduleService";
import { ModuleInput } from "../inputs/ModuleInput";

@Resolver(Module)
export class ModuleResolver {
  @Query(() => [Module])
  async getAllModules(): Promise<Module[]> {
    return await ModuleService.getAll();
  }

  @Authorized()
  @Mutation(() => Module)
  async createModule(@Arg("module") module: ModuleInput): Promise<Module> {
    return await ModuleService.createModule(module);
  }

  @Mutation(() => Module)
  async removeModule(@Arg("id") id: number): Promise<Module | { id: number }> {
    return await ModuleService.removeModule(id);
  }
}
