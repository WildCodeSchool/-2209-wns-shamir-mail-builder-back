import {Arg, Query, Resolver} from "type-graphql";
import {TemplateEmails} from "../entities/TemplateEmails";
import templateEmailsService from "../services/templateEmailsService";

@Resolver(TemplateEmails)
export class TemplateEmailsResolver {
    @Query(() => [TemplateEmails])
    async getUserTemplates(
        @Arg("email") email: string,
    ): Promise<TemplateEmails[]> {
        return await templateEmailsService.getUserTemplates(email);
    }
}
