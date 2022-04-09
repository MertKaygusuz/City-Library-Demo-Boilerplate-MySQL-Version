import { Inject, Injectable, Scope } from '@nestjs/common';
import { nameof } from 'ts-simple-nameof';
import {
  Active_Reservations_Repo,
  IActiveBookReservationsRepo,
} from './domain/active-book-reservations.repo.interface';
import {
  Book_Reservation_Histories_Repo,
  IBookReservationHistoriesRepo,
} from './domain/book-reservation-histories.repo.interface';
import { ReservationHistoryResponseDto } from './dto/reservation-history.response.dto';
import { BookReservationHistory } from './entities/book-reservation-history.entity';
import { ActiveBookReservationsFilterInput } from './dto/active-book-reservations.filter.input';
import { ActiveBookReservation } from './entities/active-book-reservation.entity';
import { ActiveBookReservationsResponseDto } from './dto/active-book-reservations.response.dto';
import { NumberOfBooksReservedByMembersResponseDto } from './dto/number-of-books-reserved-by-members.response.dto';
import { AssigningBookInput } from './dto/assigning-book.input';
import { BooksService } from '../books/books.service';
import { I18nRequestScopeService } from 'nestjs-i18n';
import {
  CustomExceptionBase,
  CustomException,
} from 'src/core/filters/models/custom-exception';

@Injectable({ scope: Scope.REQUEST })
export class BookReservationsService {
  constructor(
    @Inject(Active_Reservations_Repo)
    private readonly activeBookReservationsRepo: IActiveBookReservationsRepo,
    @Inject(Book_Reservation_Histories_Repo)
    private readonly bookReservationHistoriesRepo: IBookReservationHistoriesRepo,
    private readonly booksService: BooksService,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async getNumberOfBooksReservedPerMembers(): Promise<
    NumberOfBooksReservedByMembersResponseDto[]
  > {
    const rawResult =
      await this.activeBookReservationsRepo.getNumberOfBooksReservedPerMembers();
    return rawResult as NumberOfBooksReservedByMembersResponseDto[];
  }

  private async throwMemberNotFoundError() {
    const error = await CustomExceptionBase.createInstanceWithI18n(this.i18n, [
      'MEMBER_NOT_FOUND',
    ]);

    throw new CustomException([error], '404');
  }

  private async throwNoBookReservationError() {
    const error = await CustomExceptionBase.createInstanceWithI18n(this.i18n, [
      'NO_BOOK_RESERVATION',
    ]);

    throw new CustomException([error], '404');
  }
}
