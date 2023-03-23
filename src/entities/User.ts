import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
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
  id?: number;

  @Field()
  @Column()
  username!: string;

  @Column()
  hashedPassword!: string;

  @Column({unique: true})
  @Field()
  email!: string;
  
  @Column({ nullable: true})
  @Field()
  phone!: string;

  @CreateDateColumn()
  createdAt?: Date = new Date();

  @UpdateDateColumn()
  updatedAt?: Date = new Date();

  @Field(() => Subscription,{ nullable: true})
  @OneToOne(() => Subscription, (subscription) => subscription.user, {cascade: true, eager: true})
  @JoinColumn({ name: "subscriptionId" })
  subscriptionId?: Subscription;

  @OneToMany(() => TemplateEmails, (templateEmails) => templateEmails.userId)
  templateEmails?: TemplateEmails[];

  @Field(() => [Companies], { nullable: true })
  @OneToMany(() => Companies, (companies) => companies.userId, {cascade: true, eager: true})
  companies?: Companies[];
}
