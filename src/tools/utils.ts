import { Subscription } from "./../entities/Subscription";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { TemplateEmails } from "../entities/TemplateEmails";
import { Companies } from "../entities/Companies";
import { MailSends } from "../entities/MailSends";
import {Layout} from "../entities/Layout";
import * as dotenv from "dotenv";
dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "bragagre",
  password: "example",
  database: "mail-builder",
  synchronize: true,
  entities: [
    User,
    Subscription,
    TemplateEmails,
    Companies,
    MailSends,
    Layout,
  ],
});
