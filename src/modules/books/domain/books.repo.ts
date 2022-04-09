import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { nameof } from 'ts-simple-nameof';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { IBooksRepo } from './books.interface.repo';

@Injectable()
export class BooksRepo extends BaseRepository<Book> implements IBooksRepo {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {
    super(bookRepository);
  }

  async getDistinctNumberOfField(field: string): Promise<number> {
    const bookAlias = 'Books';
    const result = await this.bookRepository
      .createQueryBuilder(bookAlias)
      .select(bookAlias + '.' + field)
      .distinct(true)
      .getRawMany(); //getCount does not work

    return result.length;
  }

  async getNumberOfBooksPerTitleAndEditionNumber() {
    const bookAlias = 'Books';
    const bookTitleName = nameof<Book>((x) => x.bookTitle);
    const editionNumberName = nameof<Book>((x) => x.editionNumber);
    const availableCountName = nameof<Book>((x) => x.availableCount);
    const bookTitleKey = bookAlias + '.' + bookTitleName;
    const editionNumberKey = bookAlias + '.' + editionNumberName;
    const availableCountKey = bookAlias + '.' + availableCountName;
    const result = await this.bookRepository
      .createQueryBuilder(bookAlias)
      .select(bookTitleKey, bookTitleName)
      .addSelect(editionNumberKey, editionNumberName)
      .addSelect(`SUM(${availableCountKey})`, 'totalAvailableCount')
      .groupBy(bookTitleKey)
      .addGroupBy(editionNumberKey)
      .orderBy('totalAvailableCount', 'DESC')
      .getRawMany();
    return result;
  }
}
