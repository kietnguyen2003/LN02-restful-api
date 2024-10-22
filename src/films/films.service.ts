import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FilmActor } from 'src/actors/entities/film-actor.entity';
import { FilmCategory } from './entities/film-category.entity';
import { Inventory } from './entities/inventory.entity';
import { Rental } from './entities/rental.entity';
import { In } from 'typeorm';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmsRepository: Repository<Film>,
    @InjectRepository(FilmActor)
    private filmActorRepository: Repository<FilmActor>,
    @InjectRepository(FilmCategory)
    private filmCategoryRepository: Repository<FilmCategory>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const existingFilm = await this.filmsRepository.findOne({
      where: { title: createFilmDto.title },
    });

    if (existingFilm) {
      throw new HttpException('Film already exists', HttpStatus.CONFLICT);
    }

    const newFilm = this.filmsRepository.create(createFilmDto);
    const savedFilm = await this.filmsRepository.save(newFilm);

    return {
      statusCode: 201,
      message: 'Film created successfully',
      data: savedFilm,
    };
  }

  findAll() {
    return this.filmsRepository.find();
  }

  async findOne(id: number) {
    const film = await this.filmsRepository.findOne({
      where: { film_id: id },
    });

    if (!film) {
      throw new NotFoundException(`Film with id ${id} not found`);
    }

    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmsRepository.findOne({
      where: { film_id: id },
    });

    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }

    Object.assign(film, updateFilmDto);
    return this.filmsRepository.save(film);
  }

  async remove(id: number) {
    const film = await this.filmsRepository.findOne({
      where: { film_id: id },
    });

    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }

    const inventories = await this.inventoryRepository.find({
      where: { film_id: id },
    });

    const inventoryIds = inventories.map((inventory) => inventory.inventory_id);

    await this.rentalRepository.delete({ inventory_id: In(inventoryIds) });

    await this.filmActorRepository.delete({ film_id: id });

    await this.filmCategoryRepository.delete({ film_id: id });

    await this.inventoryRepository.delete({ film_id: id });

    return await this.filmsRepository.remove(film);
  }
}
