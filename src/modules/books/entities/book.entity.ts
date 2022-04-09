import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BookCoverTypes } from 'src/common/enums/book-cover-types';
import { BookTitleTypes } from 'src/common/enums/book-title-types';
import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { ActiveBookReservation } from 'src/modules/book-reservations/entities/active-book-reservation.entity';
import { BookReservationHistory } from 'src/modules/book-reservations/entities/book-reservation-history.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Books')
@ObjectType()
export class Book extends BaseEntityModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  bookId: number;

  @Column('nvarchar', { length: 150, nullable: false })
  @Field(() => String)
  authorName: string;

  @Column('nvarchar', { length: 150, nullable: false })
  @Field(() => String)
  bookTitle: string;

  @Column({ type: 'bigint', nullable: false })
  @Field(() => Float, {
    description: 'Edition date in epoch milliseconds',
  })
  firstPublishedDate: number;

  @Column('tinyint')
  @Field(() => Int)
  editionNumber: number;

  @Column({ type: 'bigint', nullable: false })
  @Field(() => Float, {
    description: 'Edition date in epoch milliseconds',
  })
  editionDate: number;

  @Column('int')
  @Field(() => Int)
  availableCount: number;

  @Column('int')
  @Field(() => Int)
  reservedCount: number;

  @Field(() => Int)
  @Column('tinyint')
  titleType: BookTitleTypes;

  @Field(() => Int)
  @Column('tinyint')
  coverType: BookCoverTypes;

  @OneToMany(() => ActiveBookReservation, (abr) => abr.book)
  activeBookReservations: ActiveBookReservation[];

  @OneToMany(() => BookReservationHistory, (brh) => brh.book)
  bookReservationHistories: BookReservationHistory[];
}
