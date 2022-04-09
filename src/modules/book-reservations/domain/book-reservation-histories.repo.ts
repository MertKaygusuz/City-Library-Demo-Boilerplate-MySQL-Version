import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { Repository } from 'typeorm';
import { BookReservationHistory } from '../entities/book-reservation-history.entity';
import { IBookReservationHistoriesRepo } from './book-reservation-histories.repo.interface';

@Injectable()
export class BookReservationHistoriesRepo
  extends BaseRepository<BookReservationHistory>
  implements IBookReservationHistoriesRepo
{
  constructor(
    @InjectRepository(BookReservationHistory)
    private readonly bookReservationHistoriesRepository: Repository<BookReservationHistory>,
  ) {
    super(bookReservationHistoriesRepository);
  }
}
