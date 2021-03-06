import {
  Resolver,
  Query,
  Args,
  Parent,
  ResolveField,
  Float,
  Mutation,
  Int,
} from '@nestjs/graphql';
import { AuthRolesGuard } from '../auth/guards/auth-roles.guard';
import { BooksService } from '../books/books.service';
import { Book } from '../books/entities/book.entity';
import { Member } from '../members/entities/member.entity';
import { MembersService } from '../members/members.service';
import { BookReservationsService } from './book-reservations.service';
import { ActiveBookReservationsFilterInput } from './dto/active-book-reservations.filter.input';
import { ActiveBookReservationsResponseDto } from './dto/active-book-reservations.response.dto';
import { AssigningBookInput } from './dto/assigning-book.input';
import { NumberOfBooksReservedByMembersResponseDto } from './dto/number-of-books-reserved-by-members.response.dto';

@Resolver(() => ActiveBookReservationsResponseDto)
@AuthRolesGuard('Admin')
export class ActiveBookReservationsResolver {
  constructor(
    private readonly bookReservationsService: BookReservationsService,
    private readonly booksService: BooksService,
    private readonly membersService: MembersService,
  ) {}

  @Query(() => [ActiveBookReservationsResponseDto], {
    description:
      'returns active book reservations using filter including memberId and bookId.',
  })
  async getAllActiveBookReservations(
    @Args('activeBookReservationsFilterInput')
    activeBookReservationsFilterInput: ActiveBookReservationsFilterInput,
  ): Promise<ActiveBookReservationsResponseDto[]> {
    return await this.bookReservationsService.getAllActiveBookReservations(
      activeBookReservationsFilterInput,
    );
  }

  @Query(() => [NumberOfBooksReservedByMembersResponseDto])
  async getNumberOfBooksReservedPerMembers(): Promise<
    NumberOfBooksReservedByMembersResponseDto[]
  > {
    return await this.bookReservationsService.getNumberOfBooksReservedPerMembers();
  }

  @Query(() => [Float], {
    description:
      'returns estimated return dates in epoch ms with respect to given bookId',
  })
  async getReservedBooksEstimatedReturnDates(
    @Args('bookId', { type: () => Int, nullable: false }) bookId: number,
  ): Promise<number[]> {
    return await this.bookReservationsService.getReservedBooksEstimatedReturnDates(
      bookId,
    );
  }

  @ResolveField(() => Book, {
    description: 'resolves book field dynamically for active book reservations',
  })
  async getBookInfo(
    @Parent() bookReservations: ActiveBookReservationsResponseDto,
  ): Promise<Book> {
    return await this.booksService.getBookById(bookReservations.bookId);
  }

  @ResolveField(() => Member, {
    description:
      'resolves member field dynamically for active book reservations',
  })
  async getMemberInfo(
    @Parent() bookReservations: ActiveBookReservationsResponseDto,
  ): Promise<Member> {
    return await this.membersService.getMemberByMemberId(
      bookReservations.memberId,
    );
  }

  //these two mutations can use same input
  @Mutation(() => Boolean)
  async assignBookToMember(
    @Args('assigningBookInput') assigningBookInput: AssigningBookInput,
  ): Promise<boolean> {
    await this.bookReservationsService.assignBookToMember(assigningBookInput);
    return true;
  }

  @Mutation(() => Boolean)
  async unAssignBookToMember(
    @Args('assigningBookInput') assigningBookInput: AssigningBookInput,
  ): Promise<boolean> {
    await this.bookReservationsService.unAssignBookToMember(assigningBookInput);
    return true;
  }
}
