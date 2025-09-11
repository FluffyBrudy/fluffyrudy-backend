import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('discussion')
export class Discussion {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'content' })
  content: string;

  @Column({ name: 'post_id', type: 'integer' })
  postId: number;

  @Column('timestamptz', { name: 'created_at', default: () => 'NOW()' })
  createdAt: Date;

  @Column('timestamptz', { name: 'updatedAt', default: () => 'NOW()' })
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column('boolean', { name: 'is_parent', default: false })
  isParent: boolean;
}
