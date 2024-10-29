import { PartialType } from '@nestjs/mapped-types';
import { CreateActorDto } from './create-actor.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateActorDto extends PartialType(CreateActorDto) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    description: 'The updated first name of the actor',
    example: 'Chris',
  })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    description: 'The updated last name of the actor',
    example: 'Evans',
  })
  last_name: string;
}
