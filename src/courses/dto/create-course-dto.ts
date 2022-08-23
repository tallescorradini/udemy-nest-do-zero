import { IsArray, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];
}
