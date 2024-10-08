import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor) private actorsRepository: Repository<Actor>,
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
    const actor = await this.actorsRepository.findOneBy({ actor_id: id });

    if (!actor) {
      throw new Error(`Actor with id ${id} not found`);
    }

    return actor;
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return `This action updates a #${id} actor`;
  }

  remove(id: number) {
    return `This action removes a #${id} actor`;
  }
}
