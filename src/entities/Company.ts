import { MailSends } from "./MailSends";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import {Layout} from "./Layout";

@ObjectType()
@Entity()
export class Company {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  siret!: string;

  @Column()
  @Field()
  address!: string;

  @Column()
  @Field()
  phone!: string;

  @Column()
  @Field()
  email!: string;

  @Column()
  @Field()
  website!: string;

  @Column()
  @Field()
  facebook!: string;

  @Column()
  @Field()
  instagram!: string;

  @Column()
  @Field()
  twitter!: string;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field()
  logo!: string;

  @Column()
  @Field()
  subscribed!: boolean;

  @Column()
  @Field()
  createdAt!: Date;

  @Column()
  @Field()
  updatedAt!: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.companyId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  userId?: User;

  @OneToMany(() => MailSends, (mailSends) => mailSends.companyId)
  mailSends!: MailSends[];

  @Field(() => [Layout], { nullable: true })
  @OneToMany(() => Layout, (layout) => layout.companyId, { eager:true })
  layouts!: Layout[];
}
