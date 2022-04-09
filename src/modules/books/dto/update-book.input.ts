import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { RegisterBookInput } from './register-book.input';

@InputType()
export class UpdateBookInput extends PartialType(RegisterBookInput) {
  @Field(() => Int, { nullable: false })
  id: number;
}
