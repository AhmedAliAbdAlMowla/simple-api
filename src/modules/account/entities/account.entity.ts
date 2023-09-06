import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
} from 'typeorm';

@Entity('account')
@Unique(['email']) // Ensures that email is unique
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', length: 30 })
  firstName: string;

  @Column({ name: 'last_name', length: 30 })
  lastName: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' }) // Replace with your role options
  role: string;

  @Column({ name: 'profile_image_link', length: 400, nullable: true })
  profileImageLink: string;

  @Column({ name: 'profile_image_s3_key', length: 100, nullable: true })
  profileImageS3Key: string;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ name: 'job_title', length: 150, nullable: true })
  jobTitle: string;

  @Column({ length: 1000, nullable: true })
  bio: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ name: 'reset_password_code', length: 4, nullable: true })
  resetPasswordCode: string;

  @Column({ name: 'reset_password_expires', type: 'timestamp', nullable: true })
  resetPasswordExpires: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
