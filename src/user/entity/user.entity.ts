import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Schema } from '../constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', type: 'varchar', length: Schema.username.max })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    length: Schema.email.max,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: Schema.password.max * 2,
  })
  password: string;
}
