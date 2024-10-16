import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { FilmActor } from '../actors/entities/film-actor.entity';
import { FilmCategory } from './entities/film-category.entity';
import { Inventory } from './entities/inventory.entity';
import { Rental } from './entities/rental.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film,FilmActor,FilmCategory,Inventory,Rental])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
