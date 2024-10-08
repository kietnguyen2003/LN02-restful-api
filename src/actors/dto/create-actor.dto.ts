import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateActorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  last_name: string;
}
