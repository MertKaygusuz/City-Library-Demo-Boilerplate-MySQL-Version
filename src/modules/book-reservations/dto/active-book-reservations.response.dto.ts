import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class ActiveBookReservationsResponseDto {
  @Field(() => Float)
  receivedDate: number;
  @Field(() => Float)
  availableAt: number;
  @Field(() => String)
  memberId: string;
  @Field(() => Int)
  bookId: number;
}
