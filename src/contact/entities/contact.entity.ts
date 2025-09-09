import { EMAIL, MESSAGE, SUBJECT, USERNAME } from 'src/constants/schema';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contact' })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', type: 'varchar', length: USERNAME.MAX })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: EMAIL.MAX })
  email: string;

  @Column({ name: 'subject', type: 'varchar', length: SUBJECT.MAX })
  subject: string;

  @Column({ name: 'message', type: 'varchar', length: MESSAGE.MAX })
  message: string;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'NOW()' })
  createdAt: string;
}
