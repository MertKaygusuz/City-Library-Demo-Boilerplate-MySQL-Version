import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity({ name: 'Roles' })
@ObjectType()
export class Role extends BaseEntityModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  roleId: number;

  @Field(() => String)
  @Column('nvarchar', { length: 150, nullable: false })
  @Index({ unique: true })
  roleName: string;

  @ManyToMany(() => Member, (member) => member.roles)
  @JoinTable()
  members: Member[];
}
