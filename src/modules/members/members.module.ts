import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { MembersRepo } from './domain/members.repo';
import { Member } from './entities/member.entity';
import { Member_Repo } from './domain/members.interface.repo';
import { Role } from './entities/role.entity';
import { Role_Repo } from './domain/roles.interface.repo';
import { RolesRepo } from './domain/roles.repo';
import { MembersService } from './members.service';
import { MembersResolver } from './members.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Role]), BaseRepository],
  providers: [
    {
      provide: Member_Repo,
      useClass: MembersRepo,
    },
    {
      provide: Role_Repo,
      useClass: RolesRepo,
    },
    MembersResolver,
    MembersService,
  ],
  exports: [Member_Repo, Role_Repo, MembersService], //exporting repos for seeding in app controller
})
export class MembersModule {}
