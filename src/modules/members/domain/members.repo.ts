import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { Repository } from 'typeorm';
import { Member } from '../entities/member.entity';
import { IMembersRepo } from './members.interface.repo';

@Injectable()
export class MembersRepo
  extends BaseRepository<Member>
  implements IMembersRepo
{
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {
    super(memberRepository);
  }

  async getMemberByNameWithRoles(memberName: string): Promise<Member> {
    const result = await this.memberRepository.findOne({
      where: { memberName: memberName },
      relations: ['roles'],
    });

    return result;
  }

  async getMemberByIdWithRoles(memberId: string): Promise<Member> {
    const result = await this.memberRepository.findOne({
      where: { memberId: memberId },
      relations: ['roles'],
    });

    return result;
  }
}
