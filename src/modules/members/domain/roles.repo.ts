import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { IRolesRepo } from './roles.interface.repo';

@Injectable()
export class RolesRepo extends BaseRepository<Role> implements IRolesRepo {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }
}
