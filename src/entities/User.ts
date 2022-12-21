import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Companies } from "./Companies";
import { Subscription } from "./Subscription";
import { TemplateEmails } from "./TemplateEmails";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  username!: string;

  @Column()
  hashedPassword!: string;

  @Column()
  @Field()
  phone!: string;

  @Column()
  @Field()
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Subscription, (subscription) => subscription.user)
  @JoinColumn({ name: "subscriptionId" })
  subscriptionId!: Subscription;

  @OneToMany(() => TemplateEmails, (templateEmails) => templateEmails.userId)
  templateEmails!: TemplateEmails[];

  @OneToMany(() => Companies, (companies) => companies.userId)
  companies!: Companies[];
}
