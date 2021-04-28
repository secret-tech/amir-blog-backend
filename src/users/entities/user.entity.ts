import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
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
  name: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column()
  phone: string;

  @Column()
  status: string;

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
