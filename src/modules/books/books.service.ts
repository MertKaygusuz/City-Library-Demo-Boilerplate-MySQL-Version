import { Inject, Injectable, Scope } from '@nestjs/common';
import { nameof } from 'ts-simple-nameof';
import { Book_Repo, IBooksRepo } from './domain/books.interface.repo';
import { RegisterBookInput } from './dto/register-book.input';
import { TotalAvailableCountsPerTitleEndEditionNumberResponseDto } from './dto/total-available-counts-per-title-end-edition-number.response.dto';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';
import { I18nRequestScopeService } from 'nestjs-i18n';
import {
  CustomExceptionBase,
  CustomException,
} from 'src/core/filters/models/custom-exception';
import { ObjectID } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class BooksService {
  constructor(
    @Inject(Book_Repo)
    private readonly booksRepo: IBooksRepo,
    private readonly i18n: I18nRequestScopeService,
  ) {}
  async create(registerBookInput: RegisterBookInput): Promise<number> {
    const newBook = new Book();
    newBook.authorName = registerBookInput.authorName;
    newBook.bookTitle = registerBookInput.bookTitle;
    newBook.coverType = registerBookInput.coverType;
    newBook.editionDate = registerBookInput.editionDate;
    newBook.editionNumber = registerBookInput.editionNumber;
    newBook.firstPublishedDate = registerBookInput.firstPublishDate;
    newBook.titleType = registerBookInput.titleType;
    newBook.availableCount = registerBookInput.availableCount;
    newBook.reservedCount = registerBookInput.reservedCount;
    await this.booksRepo.create(newBook);
    return newBook.bookId;
  }

  async findAll(): Promise<Book[]> {
    return await this.booksRepo.findWithOptions({
      where: { isDeleted: false },
    });
  }

  async getBookById(id: string): Promise<Book> {
    return await this.booksRepo.findOneById(id);
  }

  async update(updateBookInput: UpdateBookInput) {
    const { id, ...updatedFields } = updateBookInput;
    const updatedCount = await this.booksRepo.updateById(id, updatedFields);

    if (!updatedCount) throw await this.throwBookNotFoundError();
  }

  async remove(id: number) {
    await this.booksRepo.deleteByIdSoftly(id);
    return true;
  }

  async customErrorExampleInBookService(): Promise<boolean> {
    const error = await CustomExceptionBase.createInstanceWithI18n(
      this.i18n,
      ['error.BOOK_NOT_FOUND'],
      'fake property (optional)',
      'fake value (optional)',
    );

    throw new CustomException([error], '404');
    return true;
  }

  private async throwBookNotFoundError() {
    const error = await CustomExceptionBase.createInstanceWithI18n(this.i18n, [
      'BOOK_NOT_FOUND',
    ]);

    throw new CustomException([error], '404');
  }

  private async throwBookNotAvailableError() {
    const error = await CustomExceptionBase.createInstanceWithI18n(this.i18n, [
      'BOOK_NOT_AVAILABLE',
    ]);

    throw new CustomException([error]);
  }
}
