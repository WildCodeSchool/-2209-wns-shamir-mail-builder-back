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
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
