import { Resolver, Query, Arg } from "type-graphql";
import { TemplateEmails } from "../entities/TemplateEmails";
import templateEmailsService from "../services/templateEmailsService";

@Resolver(TemplateEmails)
export class TemplateEmailsResolver {
    @Query(() => [TemplateEmails])
    async getUserTemplates(
        @Arg("email") email: string,
    ): Promise<TemplateEmails[]> {
        try {
            const userTemplates = await templateEmailsService.getUserTemplates(email);
            console.log("TEMPLATES", userTemplates);
            return userTemplates ? userTemplates : [];
        } catch (err: any) {
            return err;
        }
    }
}
