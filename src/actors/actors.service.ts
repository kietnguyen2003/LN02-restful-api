import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';
import { ActorInfo } from './entities/actor-info.entity';
import { FilmActor } from './entities/film-actor.entitty';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor) private actorsRepository: Repository<Actor>,
    @InjectRepository(FilmActor)
    private filmActorsRepository: Repository<FilmActor>,
    @InjectRepository(ActorInfo)
    private actorsInfoRepository: Repository<ActorInfo>,
  ) {}

  async create(createActorDto: CreateActorDto) {
    const existingActor = await this.actorsRepository.findOne({
      where: {
        first_name: createActorDto.first_name,
        last_name: createActorDto.last_name,
      },
    });

    if (existingActor) {
      throw new HttpException('Actor already exists', HttpStatus.CONFLICT);
    }

    const newActor = this.actorsRepository.create(createActorDto);
    const savedActor = await this.actorsRepository.save(newActor);

    return {
      statusCode: 201,
      message: 'Actor created successfully',
      data: savedActor,
    };
  }

  findAll() {
    return this.actorsRepository.find();
  }

  async findOne(id: number) {
    const actor = await this.actorsInfoRepository.findOneBy({ actor_id: id });

    if (!actor) {
      throw new NotFoundException(`Actor with id ${id} not found`);
    }
    return actor;
  }

  async update(id: number, updateActorDto: UpdateActorDto) {
    const actor = await this.actorsRepository.findOneBy({ actor_id: id });

    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }

    Object.assign(actor, updateActorDto);
    return this.actorsRepository.save(actor);
  }

  async remove(id: number) {
    const actor = await this.actorsRepository.findOneBy({ actor_id: id });

    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }
    await this.filmActorsRepository.delete({ actor_id: id });
    return await this.actorsRepository.remove(actor);
  }
}
