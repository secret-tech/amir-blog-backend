import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { UserRole } from '../interfaces/users.interface';
import { Blog } from '../../blogs/entities/blog.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Blog, (blog) => blog.id)
  @JoinColumn({ name: 'blog', referencedColumnName: 'id' })
  blog: Blog;

  @Column({
    nullable: true,
  })
  firstName: string;

  @Column({
    nullable: true,
  })
  lastName: string;

  @Column({
    nullable: true,
  })
  patronymic: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: false,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    default: 0,
  })
  state: number;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  lastLoginDate: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.user,
  })
  role: UserRole;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;
}
