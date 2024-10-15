import { Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'film_actor' })
export class FilmActor {
  @PrimaryColumn()
  actor_id: number;

  @PrimaryColumn()
  film_id: number;

  @UpdateDateColumn()
  last_update: Date;
}
