import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { ActiveBookReservation } from 'src/modules/book-reservations/entities/active-book-reservation.entity';
import { BookReservationHistory } from 'src/modules/book-reservations/entities/book-reservation-history.entity';
import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'Members' })
@ObjectType()
export class Member extends BaseEntityModel {
  @PrimaryGeneratedColumn('uuid')
  memberId: string;

  @Column('nvarchar', { length: 150, nullable: false })
  @Index({ unique: true })
  @Field(() => String)
  memberName: string;

  @Column('nvarchar', { length: 150, nullable: false })
  @Field(() => String)
  fullName: string;

  @Column({ type: 'bigint', nullable: false })
  @Field(() => Float)
  birthDate: number;

  @Column('nvarchar', { length: 250, nullable: false })
  @Field(() => String)
  address: string;

  @Column('nvarchar')
  password: string;

  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.members)
  roles: Role[];

  @OneToMany(() => ActiveBookReservation, (abr) => abr.member)
  activeBookReservations: ActiveBookReservation[];

  @OneToMany(() => BookReservationHistory, (brh) => brh.member)
  bookReservationHistories: BookReservationHistory[];
}
