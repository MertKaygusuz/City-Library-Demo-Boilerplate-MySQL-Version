import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { Member } from 'src/modules/members/entities/member.entity';
import { nameof } from 'ts-simple-nameof';
import { Repository } from 'typeorm';
import { ActiveBookReservation } from '../entities/active-book-reservation.entity';
import { IActiveBookReservationsRepo } from './active-book-reservations.repo.interface';

@Injectable()
export class ActiveBookReservationsRepo
  extends BaseRepository<ActiveBookReservation>
  implements IActiveBookReservationsRepo
{
  constructor(
    @InjectRepository(ActiveBookReservation)
    private readonly activeBookReservationsRepository: Repository<ActiveBookReservation>,
  ) {
    super(activeBookReservationsRepository);
  }

  async getNumberOfBooksReservedPerMembers() {
    const fullName = nameof<Member>((x) => x.fullName);
    const memberName = nameof<Member>((x) => x.memberName);
    const addressName = nameof<Member>((x) => x.address);
    const birthDateName = nameof<Member>((x) => x.birthDate);
    const reservationAlias = 'abr';
    const memberAlias = 'm';
    const memberIdKey =
      reservationAlias + '.' + nameof<ActiveBookReservation>((x) => x.member);
    const result = await this.activeBookReservationsRepository
      .createQueryBuilder(reservationAlias)
      .leftJoinAndSelect(memberIdKey, memberAlias)
      .select(memberAlias + '.' + fullName, fullName)
      .addSelect(memberAlias + '.' + memberName, memberName)
      .addSelect(memberAlias + '.' + addressName, addressName)
      .addSelect(memberAlias + '.' + birthDateName, birthDateName)
      .addSelect(`COUNT(*)`, 'activeBookReservationsCount')
      .groupBy(memberIdKey)
      .orderBy(fullName)
      .getRawMany();
    return result;
  }
}
