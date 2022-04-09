import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { Book } from 'src/modules/books/entities/book.entity';
import { Member } from 'src/modules/members/entities/member.entity';
import { addDaysToEpochTime } from 'src/utils/functions/date-time';
import {
  AfterLoad,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ActiveBookReservations')
export class ActiveBookReservation extends BaseEntityModel {
  @PrimaryGeneratedColumn('increment')
  reservationId: number;

  @Column({ type: 'bigint', nullable: false })
  @Index()
  receivedDate: number;
  @Column()
  memberId: string;
  @Column()
  bookId: number;

  @ManyToOne(() => Member, (member) => member.activeBookReservations)
  @JoinColumn({ name: 'memberId' })
  public member: Member;

  @ManyToOne(() => Book, (book) => book.activeBookReservations)
  @JoinColumn({ name: 'bookId' })
  public book: Book;

  availableAt: number;

  @AfterLoad()
  getAvailabeAt() {
    this.availableAt = addDaysToEpochTime(this.receivedDate, 7);
  }
}
