import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ActiveBookReservationsFilterInput {
  @Field(() => String, { nullable: true })
  memberId: string;
  @Field(() => Int, { nullable: true })
  bookId: number;
}
