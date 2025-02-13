import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({default:null})
  refresh_token?: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
