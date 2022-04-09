import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { UpdateBookInput } from './dto/update-book.input';
import { RegisterBookInput } from './dto/register-book.input';
import { TotalAvailableCountsPerTitleEndEditionNumberResponseDto } from './dto/total-available-counts-per-title-end-edition-number.response.dto';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Int, { description: 'returns registered book id' })
  async createBook(
    @Args('registerBookInput') registerBookInput: RegisterBookInput,
  ): Promise<number> {
    return await this.booksService.create(registerBookInput);
  }

  @Query(() => Boolean, {
    description: 'this is fake query for custom error exception handling test.',
  })
  customErrorExampleInBookService() {
    return this.booksService.customErrorExampleInBookService();
  }

  @Query(() => [Book], { name: 'books' })
  async findAll(): Promise<Book[]> {
    return await this.booksService.findAll();
  }

  @Mutation(() => Boolean)
  async updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    await this.booksService.update(updateBookInput);
    return true;
  }

  @Mutation(() => Boolean, {
    description: 'Soft delete operation for book records',
  })
  async removeBook(
    @Args('id', { type: () => String }) id: number,
  ): Promise<boolean> {
    return await this.booksService.remove(id);
  }
}