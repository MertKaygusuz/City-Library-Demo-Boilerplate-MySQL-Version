import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AssigningBookInput {
  @Field(() => Int, { nullable: false })
  bookId: number;
  @Field(() => String, { nullable: false })
  memberId: string;
}
