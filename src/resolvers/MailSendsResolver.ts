import { Arg, Query } from "type-graphql";
import { MailService } from "../services/mailService";

const { GraphQLJSONObject } = require("graphql-type-json");

export class MailSendsResolver {
  @Query(() => GraphQLJSONObject, { nullable: true })
  async sendEmail(
    @Arg("email") email: string,
    @Arg("subject") subject: string,
    @Arg("message") message: string
  ): Promise<{
    error: boolean;
    message: string;
  }> {
    return await MailService.sendEmail(email, subject, message);
  }
}
