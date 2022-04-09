import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { Book } from 'src/modules/books/entities/book.entity';
import { Member } from 'src/modules/members/entities/member.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('BookReservationHistories')
export class BookReservationHistory extends BaseEntityModel {
  @PrimaryGeneratedColumn('increment')
  historyId: number;

  @Column({ type: 'bigint', nullable: false })
  receivedDate: number;
  @Column({ type: 'bigint', nullable: false })
  returnDate: number;
  @Column()
  memberId: string;
  @Column()
  bookId: number;

  @ManyToOne(() => Member, (member) => member.bookReservationHistories)
  @JoinColumn({ name: 'memberId' })
  public member: Member;

  @ManyToOne(() => Book, (book) => book.bookReservationHistories)
  @JoinColumn({ name: 'bookId' })
  public book: Book;
}
