import { RequestContext } from 'src/core/middlewares/models/request-context';
import { BeforeInsert, Column, Index } from 'typeorm';

export abstract class BaseEntityModel {
  @Index()
  @Column({ type: 'bigint', nullable: false })
  createdAt: number;
  @Column({ type: 'bigint', nullable: true })
  updatedAt?: number | null;
  @Index()
  @Column({ type: 'bigint', nullable: true })
  deletedAt?: number | null;
  @Column('varchar', { length: 100, nullable: true })
  createdBy: string;
  @Column('varchar', { length: 100, nullable: true })
  updatedBy?: string;
  @Index()
  @Column('varchar', { length: 100, nullable: true })
  deletedBy?: string;
  @Column()
  isDeleted: boolean;

  @BeforeInsert()
  beforeInsertActions() {
    this.isDeleted = false;
    this.createdAt = Date.now();
    this.createdBy = RequestContext.getMemberIdFromRequest();
  }
}
