import { IBaseRepository } from 'src/domain-base/base-repo.interface';
import { Book } from '../entities/book.entity';

export const Book_Repo = 'Books Repository';

export interface IBooksRepo extends IBaseRepository<Book> {
  getDistinctNumberOfField(field: string): Promise<number>;
  getNumberOfBooksPerTitleAndEditionNumber(): Promise<any>;
}
