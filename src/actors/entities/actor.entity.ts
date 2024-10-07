import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  actor_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @UpdateDateColumn()
  last_update: Date;
}
