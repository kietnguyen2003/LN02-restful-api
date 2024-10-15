import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateActorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)

  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)

  last_name: string;
}
