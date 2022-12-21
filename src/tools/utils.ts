import { Columns } from "./../entities/Columns";
import { Rows } from "./../entities/Rows";
import { Subscription } from "./../entities/Subscription";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { TemplateEmails } from "../entities/TemplateEmails";
import { Layouts } from "../entities/Layouts";
import { Companies } from "../entities/Companies";
import { MailSends } from "../entities/MailSends";

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
    Layouts,
    Rows,
    Columns,
    Companies,
    MailSends,
  ],
});
