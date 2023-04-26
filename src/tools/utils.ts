import { Subscription } from "../entities/Subscription";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { TemplateEmails } from "../entities/TemplateEmails";
import { Companies } from "../entities/Companies";
import { MailSends } from "../entities/MailSends";
import {Layout} from "../entities/Layout";
import * as dotenv from "dotenv";
import {Module} from "../entities/Module";
dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: `${process.env.NODE_ENV === "test" ? process.env.DB_USER_TEST : process.env.DB_USERNAME}`,
  password: `${process.env.NODE_ENV === "test" ? process.env.DB_PASSWORD_TEST : process.env.DB_PASSWORD}`,
  database: `${process.env.NODE_ENV === "test" ? process.env.DB_NAME_TEST : process.env.DB_DATABASE}`,
  synchronize: true,
  entities: [
    User,
    Subscription,
    TemplateEmails,
    Companies,
    MailSends,
    Layout,
    Module,
  ],
});
