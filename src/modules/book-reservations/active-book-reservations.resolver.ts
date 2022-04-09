import {
  Resolver,
  Query,
  Args,
  Parent,
  ResolveField,
  Float,
  Mutation,
} from '@nestjs/graphql';
import { BooksService } from '../books/books.service';
import { Book } from '../books/entities/book.entity';
import { Member } from '../members/entities/member.entity';
import { BookReservationsService } from './book-reservations.service';
import { ActiveBookReservationsFilterInput } from './dto/active-book-reservations.filter.input';
import { ActiveBookReservationsResponseDto } from './dto/active-book-reservations.response.dto';
import { AssigningBookInput } from './dto/assigning-book.input';
import { NumberOfBooksReservedByMembersResponseDto } from './dto/number-of-books-reserved-by-members.response.dto';

@Resolver(() => ActiveBookReservationsResponseDto)
export class ActiveBookReservationsResolver {
  constructor(
    private readonly bookReservationsService: BookReservationsService,
    private readonly booksService: BooksService,
  ) {}

  @Query(() => [NumberOfBooksReservedByMembersResponseDto])
  async getNumberOfBooksReservedPerMembers(): Promise<
    NumberOfBooksReservedByMembersResponseDto[]
  > {
    return await this.bookReservationsService.getNumberOfBooksReservedPerMembers();
  }
}
