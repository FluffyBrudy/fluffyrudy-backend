import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('discussion', { schema: 'markdown' })
export class Discussion {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'content' })
  content: string;

  @Column('character varying', { name: 'post_slug', length: 255 })
  post_slug: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId: number;
}
