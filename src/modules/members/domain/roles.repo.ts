import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { nameof } from 'ts-simple-nameof';
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

  async getRolesWithIncludingNames(roleNames: string[]): Promise<Role[]> {
    const roleNameKey = nameof<Role>((x) => x.roleName);
    const alias = 'role';

    const result = await this.roleRepository
      .createQueryBuilder(alias)
      .where(`${alias}.${roleNameKey} IN (:roleNames)`, {
        roleNames: roleNames,
      })
      .getMany();

    return result;
  }
}
