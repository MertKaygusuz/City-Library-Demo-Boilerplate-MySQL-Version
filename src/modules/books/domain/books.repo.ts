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

  // async getDistinctNumberOfField(field: string): Promise<number> {
  //   const result = await this.bookMongoRepository.distinct(field, {});
  //   return result.length;
  // }

  // async getNumberOfBooksPerTitleAndEditionNumber() {
  //   const bookTitleKey = '$' + nameof<Book>((x) => x.bookTitle);
  //   const editionNumberKey = '$' + nameof<Book>((x) => x.editionNumber);
  //   const availableCountKey = '$' + nameof<Book>((x) => x.availableCount);
  //   const result = this.bookMongoRepository.aggregate([
  //     {
  //       $group: {
  //         _id: { bookTitle: bookTitleKey, editionNumber: editionNumberKey },
  //         bookTitle: { $first: bookTitleKey },
  //         editionNumber: { $first: editionNumberKey },
  //         totalAvailableCount: { $sum: availableCountKey },
  //       },
  //     },
  //     { $sort: { totalAvailableCount: -1 } },
  //   ]);

  //   return await result.toArray();
  // }
}
