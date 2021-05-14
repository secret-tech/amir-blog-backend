import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BaseEntity,
  OneToMany, JoinColumn,
} from 'typeorm';
import { Blog } from '../../blogs/entities/blog.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
    unique: true,
  })
  email: string;

  @Column()
  phone: string;

  @Column()
  status: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToOne(() => Blog, (blog) => blog.id)
  @JoinColumn({ name: 'blog', referencedColumnName: 'id' })
  blog: Blog;

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
