import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique,JoinColumn } from 'typeorm';
import { AccountEntity } from '../../account/entities/account.entity'; 

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountEntity, (account) => account.note)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 1500, nullable: true })
  excerpt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'date', nullable: true, default: null })
  updated_date: Date | null;
}
